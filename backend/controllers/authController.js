const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

// Função para gerar o token JWT
const generateToken = (id, name) => {
    return jwt.sign({ id, name }, process.env.JWT_SECRET, {
        expiresIn: "1h", // Token expira em 1 hora
    });
};

// @desc    Registar um novo utilizador
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res
            .status(400)
            .json({ message: "Por favor, preencha todos os campos." });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res
                .status(400)
                .json({ message: "Utilizador já existe com este email." });
        }

        const user = await User.create({
            name,
            email,
            password, // O hash será feito pelo hook 'pre-save' no UserModel
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id, user.name),
            });
        } else {
            res.status(400).json({ message: "Dados inválidos do utilizador." });
        }
    } catch (error) {
        console.error("Erro no registo:", error);
        // Tratar erros de validação do Mongoose
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(
                (val) => val.message
            );
            return res.status(400).json({ message: messages.join(". ") });
        }
        res.status(500).json({
            message: "Erro no servidor ao registar utilizador.",
        });
    }
};

// @desc    Autenticar utilizador & obter token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Por favor, forneça email e palavra-passe." });
    }

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id, user.name),
            });
        } else {
            res.status(401).json({
                message: "Email ou palavra-passe inválidos.",
            });
        }
    } catch (error) {
        console.error("Erro no login:", error);
        res.status(500).json({ message: "Erro no servidor ao fazer login." });
    }
};

// @desc    Obter perfil do utilizador logado
// @route   GET /api/auth/profile
// @access  Private (protegido pelo middleware 'protect')
const getUserProfile = async (req, res) => {
    // req.user é preenchido pelo middleware 'protect'
    if (req.user) {
        res.json({
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            createdAt: req.user.createdAt,
        });
    } else {
        res.status(404).json({ message: "Utilizador não encontrado" });
    }
};

module.exports = { registerUser, loginUser, getUserProfile };
