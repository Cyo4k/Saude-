const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Opções de conexão
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // Aumentado para 30 segundos
            socketTimeoutMS: 45000,
        };

        // Tenta conectar
        const conn = await mongoose.connect(process.env.MONGODB_URI, options);
        
        console.log('Tentando conectar ao MongoDB...');
        console.log(`URI de conexão: ${process.env.MONGODB_URI.replace(/:[^:@]+@/, ':****@')}`); // Oculta a senha no log
        
        if (conn.connection.readyState === 1) {
            console.log('MongoDB conectado com sucesso!');
        }

        // Eventos de conexão
        mongoose.connection.on('connected', () => {
            console.log('Mongoose conectado ao MongoDB');
        });

        mongoose.connection.on('error', (err) => {
            console.error('Erro na conexão do Mongoose:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose desconectado do MongoDB');
        });

    } catch (error) {
        console.error('Erro detalhado na conexão:', {
            message: error.message,
            name: error.name,
            code: error.code,
            codeName: error.codeName
        });
        process.exit(1);
    }
};

module.exports = connectDB;