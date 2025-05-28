import apiRequest from '../utils/apiRequest';

export const userService = {
    async login(email, password) {
        return apiRequest('/auth/login', 'POST', { email, password }, false);
    },

    async register(userData) {
        return apiRequest('/auth/register', 'POST', userData, false);
    },

    // Buscar perfil do usuário
    async getProfile() {
        return apiRequest('/users/profile');
    },

    // Atualizar perfil do usuário
    async updateProfile(formData) {
        return apiRequest('/users/profile', 'PUT', formData);
    },

    // Atualizar foto de perfil
    updateProfilePicture: async (formData) => {
        try {
            const response = await apiRequest('/users/profile/picture', 'PUT', formData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Buscar usuário por ID (apenas admin)
    getUserById: async (id) => {
        try {
            const response = await apiRequest(`/users/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Listar todos os usuários (apenas admin)
    getAllUsers: async () => {
        try {
            const response = await apiRequest('/users');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
}; 