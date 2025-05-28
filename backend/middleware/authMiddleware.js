const jwt = require('jsonwebtoken');
const User = require('../models/UserModel'); // Para buscar dados do utilizador se necessário

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Adiciona o utilizador (sem a password) ao objeto `req` para uso nas rotas protegidas
      req.user = await User.findById(decoded.id).select('-password'); 
      
      if (!req.user) {
        return res.status(401).json({ message: 'Utilizador não encontrado.' });
      }
      next();
    } catch (error) {
      console.error('Erro na autenticação do token:', error);
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expirado. Por favor, faça login novamente.' });
      }
      return res.status(401).json({ message: 'Não autorizado, token falhou.' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Não autorizado, sem token.' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Não autorizado como admin' });
  }
};

module.exports = { protect, admin };