const mongooseUser = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongooseUser.Schema({
  name: {
    type: String,
    required: [true, 'O nome é obrigatório.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'O email é obrigatório.'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Por favor, insira um email válido.'],
  },
  password: {
    type: String,
    required: [true, 'A palavra-passe é obrigatória.'],
    minlength: [6, 'A palavra-passe deve ter pelo menos 6 caracteres.'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Novos campos para o perfil
  address: {
    type: String,
    trim: true,
    default: '', // Pode ser uma string vazia
  },
  phoneNumber: {
    type: String,
    trim: true,
    default: '', // Pode ser uma string vazia
  },
  // Novo campo para a foto de perfil
  profilePictureUrl: {
    type: String,
    default: '', // Pode ser uma string vazia ou um placeholder URL
  },
});

// Middleware (hook) para fazer hash da password antes de salvar o utilizador
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar a password inserida com a password guardada (hash)
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongooseUser.model('User', userSchema);
