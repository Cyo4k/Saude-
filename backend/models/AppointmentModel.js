const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    doctor: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['agendado', 'confirmado', 'cancelado', 'realizado'],
        default: 'agendado'
    },
    notes: {
        type: String
    },
    location: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);
