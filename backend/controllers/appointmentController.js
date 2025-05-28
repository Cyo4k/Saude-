const Appointment = require("../models/AppointmentModel");

// @desc    Buscar todos os agendamentos
// @route   GET /api/appointments
// @access  Private
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ userId: req.user._id });
        res.json(appointments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Criar novo agendamento
// @route   POST /api/appointments
// @access  Private
const createAppointment = async (req, res) => {
    try {
        const { date, time, doctor, specialty, notes } = req.body;
        const appointment = await Appointment.create({
            userId: req.user._id,
            date,
            time,
            doctor,
            specialty,
            notes,
        });
        res.status(201).json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Buscar agendamento por ID
// @route   GET /api/appointments/:id
// @access  Private
const getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });
        if (!appointment) {
            return res
                .status(404)
                .json({ message: "Agendamento não encontrado" });
        }
        res.json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Atualizar agendamento
// @route   PUT /api/appointments/:id
// @access  Private
const updateAppointment = async (req, res) => {
    try {
        const updatedAppointment = await Appointment.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            { $set: req.body }, // Usa $set para atualizar os campos recebidos
            { new: true } // Retorna o documento atualizado
        );

        if (!updatedAppointment) {
            return res
                .status(404)
                .json({ message: "Agendamento não encontrado" });
        }

        res.json(updatedAppointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Deletar agendamento
// @route   DELETE /api/appointments/:id
// @access  Private
const deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });
        if (!appointment) {
            return res
                .status(404)
                .json({ message: "Agendamento não encontrado" });
        }

        await appointment.deleteOne();
        res.json({ message: "Agendamento removido" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllAppointments,
    createAppointment,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
};
