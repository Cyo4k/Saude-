import apiRequest from '../utils/apiRequest';

export const upaService = {
    // Buscar todas as UPAs
    async getUPAs(searchTerm = '') {
        return apiRequest(`/upas${searchTerm ? `?search=${searchTerm}` : ''}`);
    },

    // Buscar UPA por ID
    async getUpaById(id) {
        return apiRequest(`/upas/${id}`);
    },

    // Criar nova UPA (apenas admin)
    async createUPA(upaData) {
        return apiRequest('/upas', 'POST', upaData);
    },

    // Atualizar UPA (apenas admin)
    async updateUPA(id, upaData) {
        return apiRequest(`/upas/${id}`, 'PUT', upaData);
    },

    // Deletar UPA (apenas admin)
    async deleteUPA(id) {
        return apiRequest(`/upas/${id}`, 'DELETE');
    }
}; 