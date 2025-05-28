const express = require('express');
const router = express.Router();
const {
    getAllUpas,
    getUpaById
} = require('../controllers/upaController');

// Rotas públicas (apenas consulta)
router.route('/')
    .get(getAllUpas);

router.route('/:id')
    .get(getUpaById);

module.exports = router;