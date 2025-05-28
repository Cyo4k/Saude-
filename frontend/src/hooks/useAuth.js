import { useState, useEffect } from 'react';
import { apiRequest } from '../utils/apiRequest';

// Simulação de um hook de autenticação. Em um app real, isso viria de um Context API após login.
export const useAuth = () => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Recupera os dados do localStorage
    const storedToken = localStorage.getItem('userToken');
    const storedUserName = localStorage.getItem('userName');

    if (storedToken) {
      setToken(storedToken);
      // Aqui você poderia decodificar o token JWT para obter o userId
      // Por enquanto, vamos usar um valor simulado
      setUserId('user-id-from-token'); // TODO: Obter o userId do token real

      // Buscar dados completos do perfil após obter o token
      const fetchProfileData = async () => {
        try {
          const data = await apiRequest('/api/users/profile', 'GET', null, storedToken);
          setUserName(data.name); // Atualiza o nome caso tenha sido alterado no perfil
          setProfilePictureUrl(data.profilePictureUrl); // Armazena a URL da foto de perfil
        } catch (error) {
          console.error('Erro ao buscar dados do perfil no useAuth:', error);
          // Tratar erro, talvez deslogar o usuário se o token for inválido
        }
      };

      fetchProfileData();
    }

    setIsAuthReady(true);
  }, []);

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName'); // Remover também o nome, se estiver armazenando
    // Limpar estados locais no hook, se aplicável
    setToken(null);
    setUserId(null); // Limpar userId simulado
    setUserName(null); // Limpar nome
    setProfilePictureUrl(null); // Limpar URL da foto
  };

  return { userId, userName, isAuthReady, token, profilePictureUrl };
};