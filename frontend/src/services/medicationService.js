import apiRequest from '../utils/apiRequest';

export const medicationService = {
    // Buscar todos os medicamentos
    async getMedications() {
        return apiRequest('/medications');
    },

    // Criar novo medicamento
    async createMedication(medicationData) {
        return apiRequest('/medications', 'POST', medicationData);
    },

    // Buscar medicamento por ID
    async getMedicationById(id) {
        return apiRequest(`/medications/${id}`);
    },

    // Atualizar medicamento
    async updateMedication(id, medicationData) {
        return apiRequest(`/medications/${id}`, 'PUT', medicationData);
    },

    // Deletar medicamento
    async deleteMedication(id) {
        return apiRequest(`/medications/${id}`, 'DELETE');
    }
}; 