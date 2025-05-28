import { useState, useEffect } from 'react';
import { apiRequest } from '../utils/apiRequest';


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
      
      setUserId('user-id-from-token'); 
      const fetchProfileData = async () => {
        try {
          const data = await apiRequest('/api/users/profile', 'GET', null, storedToken);
          setUserName(data.name); 
          setProfilePictureUrl(data.profilePictureUrl); 
        } catch (error) {
          console.error('Erro ao buscar dados do perfil no useAuth:', error);
          
        }
      };

      fetchProfileData();
    }

    setIsAuthReady(true);
  }, []);

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName'); 
    setToken(null);
    setUserId(null); 
    setUserName(null); 
    setProfilePictureUrl(null); 
  };

  return { userId, userName, isAuthReady, token, profilePictureUrl };
};