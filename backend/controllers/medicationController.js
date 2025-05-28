const Medication = require("../models/MedicationModel");

// @desc    Buscar todas as medicações
// @route   GET /api/medications
// @access  Private
const getAllMedications = async (req, res) => {
    try {
        const medications = await Medication.find({ userId: req.user._id });
        res.json(medications);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Criar nova medicação
// @route   POST /api/medications
// @access  Private
const createMedication = async (req, res) => {
    try {
        const { name, dosage, frequency, startDate, endDate, doctor, notes } =
            req.body;
        const medication = await Medication.create({
            userId: req.user._id,
            name,
            dosage,
            frequency,
            startDate,
            endDate,
            doctor,
            notes,
        });
        res.status(201).json(medication);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Buscar medicação por ID
// @route   GET /api/medications/:id
// @access  Private
const getMedicationById = async (req, res) => {
    try {
        const medication = await Medication.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });
        if (!medication) {
            return res
                .status(404)
                .json({ message: "Medicação não encontrada" });
        }
        res.json(medication);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Atualizar medicação
// @route   PUT /api/medications/:id
// @access  Private
const updateMedication = async (req, res) => {
    try {
        const medication = await Medication.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });
        if (!medication) {
            return res
                .status(404)
                .json({ message: "Medicação não encontrada" });
        }

        medication.name = req.body.name || medication.name;
        medication.dosage = req.body.dosage || medication.dosage;
        medication.frequency = req.body.frequency || medication.frequency;
        medication.startDate = req.body.startDate || medication.startDate;
        medication.endDate = req.body.endDate || medication.endDate;
        medication.doctor = req.body.doctor || medication.doctor;
        medication.notes = req.body.notes || medication.notes;
        medication.active =
            req.body.active !== undefined ? req.body.active : medication.active;

        const updatedMedication = await medication.save();
        res.json(updatedMedication);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Deletar medicação
// @route   DELETE /api/medications/:id
// @access  Private
const deleteMedication = async (req, res) => {
    try {
        const medication = await Medication.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });
        if (!medication) {
            return res
                .status(404)
                .json({ message: "Medicação não encontrada" });
        }

        await medication.deleteOne();
        res.json({ message: "Medicação removida" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllMedications,
    createMedication,
    getMedicationById,
    updateMedication,
    deleteMedication,
};
