import React, { useState, useEffect, useRef } from 'react';
import { apiRequest } from '../utils/apiRequest';

const ProfilePage = ({ userId, token }) => {
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePicturePreview, setProfilePicturePreview] = useState(null);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const [existingProfilePictureUrl, setExistingProfilePictureUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const fileInputRef = useRef(null);

    const fetchProfile = async () => {
        if (!userId || !token) return;
        setLoading(true);
        setError(null);
        try {
            const data = await apiRequest('/api/users/profile', 'GET', null, token);
            setUserName(data.name);
            setUserEmail(data.email);
            setUserAddress(data.address || '');
            setUserPhoneNumber(data.phoneNumber || '');
            setExistingProfilePictureUrl(data.profilePictureUrl);
            if (data.profilePictureUrl) {
                setProfilePicturePreview(`http://localhost:5000${data.profilePictureUrl}`);
            }
        } catch (err) {
            setError(err.message || 'Erro ao carregar perfil');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [userId, token]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfilePicture(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicturePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveChanges = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        const formData = new FormData();
        if (profilePicture) {
            formData.append('profilePicture', profilePicture);
        }
        formData.append('name', userName);
        formData.append('address', userAddress);
        formData.append('phoneNumber', userPhoneNumber);

        try {
            const updatedData = await apiRequest('/api/users/profile', 'PUT', formData, token, true);
            setSuccess('Perfil atualizado com sucesso!');
            setExistingProfilePictureUrl(updatedData.profilePictureUrl);
            setProfilePicturePreview(`http://localhost:5000${updatedData.profilePictureUrl}`);
            setProfilePicture(null);
        } catch (err) {
            console.error("Erro ao salvar perfil:", err);
            setError(err || 'Erro ao atualizar perfil');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Meu Perfil</h2>
            
            {loading && <div className="text-blue-500 mb-4">Carregando...</div>}
            {error && <div className="text-red-500 mb-4">Erro: {error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}

            <div className="flex flex-col items-center space-y-4">
                <div className="relative w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {profilePicturePreview ? (
                        <img src={profilePicturePreview} alt="Preview do Perfil" className="w-full h-full object-cover" />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a4 4 0 00-4 4v1a2 2 0 002 2h8a2 2 0 002-2v-1a4 4 0 00-4-4h-4z" clipRule="evenodd" />
                        </svg>
                    )}
                    <input 
                        type="file" 
                        accept="image/*" 
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                    />
                     <div 
                         className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                         onClick={() => fileInputRef.current.click()}
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </div>
                </div>

                <div className="w-full max-w-sm space-y-3">
                    <div>
                         <label className="block text-sm font-medium text-gray-700">Nome</label>
                         <input 
                            type="text" 
                            value={userName} 
                            onChange={(e) => setUserName(e.target.value)} 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            disabled={loading}
                        />
                    </div>
                     <div>
                         <label className="block text-sm font-medium text-gray-700">Email</label>
                         <input 
                            type="email" 
                            value={userEmail} 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" disabled
                        />
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-gray-700">Endereço</label>
                         <input 
                            type="text" 
                            value={userAddress} 
                            onChange={(e) => setUserAddress(e.target.value)} 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            disabled={loading}
                        />
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-gray-700">Telefone</label>
                         <input 
                            type="text" // Considerar mudar para type="tel" e adicionar máscara/validação
                            value={userPhoneNumber} 
                            onChange={(e) => setUserPhoneNumber(e.target.value)} 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            disabled={loading}
                        />
                    </div>
                </div>

                <button 
                    onClick={handleSaveChanges} 
                    className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition-colors"
                    disabled={loading || (!profilePicture && userName === '' && userEmail === '')}
                >
                    {loading ? 'Salvando...' : 'Salvar Alterações'}
                </button>
            </div>
        </div>
    );
};

export default ProfilePage; 