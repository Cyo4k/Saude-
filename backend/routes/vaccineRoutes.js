const expressVaccine = require('express');
const routerVaccine = expressVaccine.Router();
const vaccineController = require('../controllers/VaccineController');
const { protect } = require('../middleware/authMiddleware');

// Rotas CRUD para Vacinas
routerVaccine.route('/')
    .get(protect, vaccineController.getAllVaccines)
    .post(protect, vaccineController.createVaccine);

routerVaccine.route('/:id')
    .get(protect, vaccineController.getVaccineById)
    .put(protect, vaccineController.updateVaccine)
    .delete(protect, vaccineController.deleteVaccine);

module.exports = routerVaccine;