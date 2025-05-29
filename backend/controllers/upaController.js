const Upa = require('../models/UpaModel');

// @desc    Buscar todas as UPAs
// @route   GET /api/upas
// @access  Public
const getAllUpas = async (req, res) => {
    try {
        const keyword = req.query.search ? {
            $or: [
                { nome: { $regex: req.query.search, $options: 'i' } },
                { endereco: { $regex: req.query.search, $options: 'i' } },
                // Adicione outros campos que você quer buscar aqui, ex: servicos, etc.
                // { 'services.name': { $regex: req.query.search, $options: 'i' } } // Exemplo para buscar dentro de um array de objetos
            ]
        } : {};

        const upas = await Upa.find({ ...keyword });
        res.json(upas);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Buscar UPA por ID
// @route   GET /api/upas/:id
// @access  Public
const getUpaById = async (req, res) => {
    try {
        const upa = await Upa.findById(req.params.id);
        if (!upa) {
            return res.status(404).json({ message: 'UPA não encontrada' });
        }
        res.json(upa);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllUpas,
    getUpaById
};
