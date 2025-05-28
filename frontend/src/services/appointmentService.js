import api from '../config/api';

export const appointmentService = {
    // Buscar todos os agendamentos
    getAllAppointments: async () => {
        try {
            const response = await api.get('/appointments');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Criar novo agendamento
    createAppointment: async (appointmentData) => {
        try {
            const response = await api.post('/appointments', appointmentData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Buscar agendamento por ID
    getAppointmentById: async (id) => {
        try {
            const response = await api.get(`/appointments/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Atualizar agendamento
    updateAppointment: async (id, appointmentData) => {
        try {
            const response = await api.put(`/appointments/${id}`, appointmentData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Deletar agendamento
    deleteAppointment: async (id) => {
        try {
            const response = await api.delete(`/appointments/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
}; 