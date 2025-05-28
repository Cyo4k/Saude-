const mongoose = require('mongoose');

const vaccineSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    nextDoseDate: {
        type: Date
    },
    notes: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Vaccine', vaccineSchema);
