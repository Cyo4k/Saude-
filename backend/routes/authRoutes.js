const expressAuth = require('express');
const routerAuth = expressAuth.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { protect: protectAuth } = require('../middleware/authMiddleware'); // Renomeado para evitar conflito de nome

routerAuth.post('/register', registerUser);
routerAuth.post('/login', loginUser);
routerAuth.get('/profile', protectAuth, getUserProfile); // Rota de perfil protegida

module.exports = routerAuth;