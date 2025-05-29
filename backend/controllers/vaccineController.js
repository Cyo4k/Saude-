const Vaccine = require('../models/VaccineModel'); // Importa o modelo

// @desc    Buscar todas as vacinas
// @route   GET /api/vaccines
// @access  Private
const getAllVaccines = async (req, res) => {
    try {
        const vaccines = await Vaccine.find({ userId: req.user._id });
        res.json(vaccines);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Criar nova vacina
// @route   POST /api/vaccines
// @access  Private
const createVaccine = async (req, res) => {
    try {
        const { name, date, nextDoseDate, notes } = req.body;
        const vaccine = await Vaccine.create({
            userId: req.user._id,
            name,
            date,
            nextDoseDate,
            notes
        });
        res.status(201).json(vaccine);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Buscar vacina por ID
// @route   GET /api/vaccines/:id
// @access  Private
const getVaccineById = async (req, res) => {
    try {
        const vaccine = await Vaccine.findOne({
            _id: req.params.id,
            userId: req.user._id
        });
        if (!vaccine) {
            return res.status(404).json({ message: 'Vacina não encontrada' });
        }
        res.json(vaccine);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Atualizar vacina
// @route   PUT /api/vaccines/:id
// @access  Private
const updateVaccine = async (req, res) => {
    try {
        const vaccine = await Vaccine.findOne({
            _id: req.params.id,
            userId: req.user._id
        });
        if (!vaccine) {
            return res.status(404).json({ message: 'Vacina não encontrada' });
        }

        vaccine.name = req.body.name || vaccine.name;
        vaccine.date = req.body.date || vaccine.date;
        vaccine.nextDoseDate = req.body.nextDoseDate || vaccine.nextDoseDate;
        vaccine.notes = req.body.notes || vaccine.notes;

        const updatedVaccine = await vaccine.save();
        res.json(updatedVaccine);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Deletar vacina
// @route   DELETE /api/vaccines/:id
// @access  Private
const deleteVaccine = async (req, res) => {
    try {
        const vaccine = await Vaccine.findOne({
            _id: req.params.id,
            userId: req.user._id
        });
        if (!vaccine) {
            return res.status(404).json({ message: 'Vacina não encontrada' });
        }

        await vaccine.deleteOne();
        res.json({ message: 'Vacina removida' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllVaccines,
    createVaccine,
    getVaccineById,
    updateVaccine,
    deleteVaccine
};
