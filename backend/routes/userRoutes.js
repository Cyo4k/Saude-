const expressUser = require('express');
const routerUser = expressUser.Router();
const userController = require('../controllers/UserController');
const { protect } = require('../middleware/authMiddleware');

// Rotas públicas
routerUser.post('/register', userController.registerUser);
routerUser.post('/login', userController.loginUser);

// Rotas protegidas
routerUser.get('/profile', protect, userController.getUserProfile);
routerUser.put('/profile', protect, userController.upload.single('profilePicture'), userController.updateUserProfile);

module.exports = routerUser; 