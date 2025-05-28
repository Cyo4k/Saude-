const expressAppointment = require('express');
const routerAppointment = expressAppointment.Router();
const appointmentController = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

// Todas as rotas de agendamento são protegidas
routerAppointment.route('/')
    .get(protect, appointmentController.getAllAppointments)
    .post(protect, appointmentController.createAppointment);

routerAppointment.route('/:id')
    .get(protect, appointmentController.getAppointmentById)
    .put(protect, appointmentController.updateAppointment)
    .delete(protect, appointmentController.deleteAppointment);

module.exports = routerAppointment;
