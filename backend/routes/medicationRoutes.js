const expressMedication = require('express');
const routerMedication = expressMedication.Router();
const medicationController = require('../controllers/MedicationController');
const { protect } = require('../middleware/authMiddleware');

// Todas as rotas de medicação são protegidas
routerMedication.route('/')
    .get(protect, medicationController.getAllMedications)
    .post(protect, medicationController.createMedication);

routerMedication.route('/:id')
    .get(protect, medicationController.getMedicationById)
    .put(protect, medicationController.updateMedication)
    .delete(protect, medicationController.deleteMedication);

module.exports = routerMedication;
