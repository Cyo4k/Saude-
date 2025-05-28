import React, { useState, useEffect } from 'react';
import { Home, Syringe, CalendarDays, Pill, Hospital, Menu, Bell, UserCircle } from 'lucide-react';

// Importando os componentes
import HomePage from './components/HomePage';
import VaccinesPage from './components/VaccinesPage';
import AppointmentsPage from './components/AppointmentsPage';
import MedicationsPage from './components/MedicationsPage';
import UPAsPage from './components/UPAsPage';
import AuthPage from './components/AuthPage';
import ProfilePage from './components/ProfilePage';
import { useAuth } from './hooks/useAuth';
import Footer from './components/Footer';



function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { userId, userName, isAuthReady, token, profilePictureUrl } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      

      console.log("Arquivo de imagem selecionado:", file);
      alert("Funcionalidade de upload de imagem não totalmente implementada. Arquivo selecionado: " + file.name);

     
    }
  };

  useEffect(() => {
    // Verifica se existe um token no localStorage
    const token = localStorage.getItem('userToken');
    setIsAuthenticated(!!token);
  }, []);

  const navigationItems = [
    { name: 'Home', icon: <Home size={20} />, page: 'Home' },
    { name: 'Vacinas', icon: <Syringe size={20} />, page: 'Vacinas' },
    { name: 'Consultas', icon: <CalendarDays size={20} />, page: 'Consultas' },
    { name: 'Medicamentos', icon: <Pill size={20} />, page: 'Medicamentos' },
    { name: 'Unidades de Saúde', icon: <Hospital size={20} />, page: 'UPAs' },
    { name: 'Perfil', icon: <UserCircle size={20} />, page: 'Perfil' },
  ];

  const renderPage = () => {
    if (!isAuthReady) {
      return <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="ml-2">Carregando Autenticação...</p>
      </div>;
    }

    if (!isAuthenticated) {
      return <AuthPage />;
    }

    switch (currentPage) {
      case 'Home':
        return <HomePage userName={userName} userId={userId} token={token} />;
      case 'Vacinas':
        return <VaccinesPage userId={userId} token={token} />;
      case 'Consultas':
        return <AppointmentsPage userId={userId} token={token} />;
      case 'Medicamentos':
        return <MedicationsPage userId={userId} token={token} />;
      case 'UPAs':
        return <UPAsPage userId={userId} token={token} />;
      case 'Perfil':
        return <ProfilePage userId={userId} token={token} />;
      default:
        return <HomePage userName={userName} userId={userId} />;
    }
  };

  // Se não estiver autenticado, mostra apenas a página de autenticação
  if (!isAuthenticated) {
    return (
      <div className="h-screen">
        {renderPage()}
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:relative sm:translate-x-0 flex flex-col h-full bg-[#aed6f1] text-gray-800 ${isSidebarOpen ? 'w-64 sm:w-64' : 'w-20 sm:w-20'} p-4 space-y-6 transition-all duration-300 shadow-lg`}>
        <div className="flex items-center justify-between">
          {isSidebarOpen && <h1 className="text-2xl font-bold"><span className="text-black">Saúde</span><span className="text-blue-700 font-bold relative top-[-0.2em]">+</span></h1>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-md hover:bg-blue-700 focus:outline-none">
            <Menu size={24} />
          </button>
        </div>

        <div className="flex flex-col items-center space-y-2">
          {/* Container para a foto de perfil com funcionalidade de edição no hover */}
          <div
            className="relative cursor-pointer group"
            onClick={() => {
              setCurrentPage('Perfil');
              // Fechar a sidebar em telas pequenas ao selecionar um item
              const isSmallScreen = !window.matchMedia('(min-width: 640px)').matches;
              if (isSidebarOpen && isSmallScreen) {
                setIsSidebarOpen(false);
              }
            }}
          >
            {/* Renderiza a foto de perfil se profilePictureUrl existir, caso contrário, o ícone padrão */}
            {profilePictureUrl ? (
              <img
                src={`http://localhost:5000${profilePictureUrl}`}
                alt="Foto de Perfil"
                className={`rounded-full object-cover ${isSidebarOpen ? 'w-16 h-16' : 'w-10 h-10'} border-2 border-white shadow-sm`}
              />
            ) : (
              <UserCircle size={isSidebarOpen ? 60 : 40} className="text-blue-200 group-hover:opacity-75 transition-opacity" />
            )}
            {/* Ícone de edição que aparece no hover */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-camera"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z"/><circle cx="12" cy="13" r="3"/><path d="m15 6 2-3"/></svg>
            </div>
            {/* Input de arquivo escondido */}
            <input
              type="file"
              id="profilePictureInput"
              className="hidden"
              accept="image/*"
              onChange={handleProfilePictureChange}
            />
          </div>

          {isSidebarOpen && (
            <>
              <p className="text-sm">Olá, {userName}</p>
            </>
          )}
          <button className="relative p-2 rounded-full hover:bg-blue-700">
            <Bell size={20} />
          </button>
        </div>

        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setCurrentPage(item.page);
                // Fechar a sidebar em telas pequenas ao selecionar um item
                // Verifica se a sidebar está aberta e se não estamos em uma tela 'sm' ou maior
                const isSmallScreen = !window.matchMedia('(min-width: 640px)').matches; // 640px é o breakpoint padrão 'sm'
                if (isSidebarOpen && isSmallScreen) {
                  setIsSidebarOpen(false);
                }
              }}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors
                bg-gray-200 text-black ${!isSidebarOpen ? 'justify-center' : ''}
                ${currentPage === item.page ? 'bg-gray-300 shadow-md' : 'hover:bg-gray-300 shadow-sm'}`}
              title={item.name}
            >
              {item.icon}
              {isSidebarOpen && <span className="text-sm">{item.name}</span>}
            </button>
          ))}
        </nav>

        {/* Botão Sair */}
        <button
          onClick={() => {
            localStorage.removeItem('userToken');
            localStorage.removeItem('userName');
            // Redirecionar para a página de login ou home
            window.location.href = '/'; // Ou para a rota de login se houver
          }}
          className={`w-1/2 mx-auto flex items-center space-x-3 p-3 mt-auto rounded-lg transition-colors justify-center
            bg-red-600 hover:bg-red-700 shadow-md text-white`}
          title="Sair"
        >
          {isSidebarOpen && <span className="text-sm">Sair</span>}
        </button>
      </aside>

      {/* Main Content Wrapper for Flex Grow and Footer */}
      <div className="flex-1 flex flex-col">
        {/* Main Content */}
        <main className="flex-grow p-6 overflow-y-auto">
          {/* Botão de menu para telas pequenas */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="sm:hidden p-2 mb-4 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
          >
            <Menu size={24} />
          </button>
          {renderPage()}
        </main>
        {/* Adicionar o Rodapé */}
        <Footer />
      </div>
    </div>
  );
}

export default App;