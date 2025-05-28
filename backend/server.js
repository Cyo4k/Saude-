const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();

// Conectar ao banco de dados
connectDB();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

// Middlewares para parsing do corpo da requisição - precisam vir antes das rotas
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- Middleware de Rotas ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/vaccines', require('./routes/vaccineRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/medications', require('./routes/medicationRoutes'));
app.use('/api/upas', require('./routes/upaRoutes'));
// ---------------------------

// Servir arquivos estáticos da pasta 'uploads' - pode vir depois das rotas
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`)); 