import api from '../config/api';

export const vaccineService = {
    // Buscar todas as vacinas
    getAllVaccines: async () => {
        try {
            const response = await api.get('/vaccines');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Buscar vacina por ID
    getVaccineById: async (id) => {
        try {
            const response = await api.get(`/vaccines/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Registrar nova vacina
    registerVaccine: async (vaccineData) => {
        try {
            const response = await api.post('/vaccines', vaccineData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Atualizar registro de vacina
    updateVaccine: async (id, vaccineData) => {
        try {
            const response = await api.put(`/vaccines/${id}`, vaccineData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Deletar registro de vacina
    deleteVaccine: async (id) => {
        try {
            const response = await api.delete(`/vaccines/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
}; 