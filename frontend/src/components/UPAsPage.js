import React, { useState, useEffect } from 'react';
import { MapPin, Search, Phone, Hospital as HospitalIconPage } from 'lucide-react';
import { apiRequest as apiRequestUPAs } from '../utils/apiRequest';

const UPAsPage = ({ userId, token }) => {
  const [upas, setUpas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Inicia como false, será true durante a busca
  const [error, setError] = useState(null);
  
  const apiBaseUrl = '/api/upas';

  const fetchUPAs = async (currentSearchTerm) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiRequestUPAs(`${apiBaseUrl}?search=${currentSearchTerm}`, 'GET', null, null);
      setUpas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Busca inicial quando o componente é montado
    fetchUPAs(searchTerm); 
  }, []); // Array de dependências vazio para rodar apenas uma vez na montagem

  // Handler para o input de busca, com debounce para evitar muitas requisições
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
        if (searchTerm !== undefined) { // Evita busca com undefined na montagem inicial
             fetchUPAs(searchTerm);
        }
    }, 500); // Aguarda 500ms após o usuário parar de digitar

    return () => clearTimeout(debounceTimer); // Limpa o timer se o componente desmontar ou searchTerm mudar
  }, [searchTerm]);


  const openInMaps = (address, pluscode) => {
    if (pluscode) {
        window.open(`https://www.google.com/maps?q=${encodeURIComponent(pluscode)}`, '_blank');
    } else if (address) {
        window.open(`https://www.google.com/maps?q=${encodeURIComponent(address)}`, '_blank');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Unidades de Saúde</h2>
      <div className="mb-6 relative">
        <input 
          type="text"
          placeholder="Buscar UPA por nome, endereço ou serviço..."
          className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {isLoading && <div className="flex justify-center items-center py-10"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-500"></div><p className="ml-3 text-gray-600">Carregando unidades...</p></div>}
      {error && <p className="text-red-500 text-center py-5">Erro ao carregar unidades: {error}</p>}
      
      {!isLoading && !error && upas.length === 0 ? (
        <div className="text-center py-10">
            <HospitalIconPage size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Nenhuma unidade de saúde encontrada com os critérios de busca.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {upas.map((upa) => (
            <div key={upa._id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-teal-700 mb-1">{upa.nome}</h3>
              <p className="text-sm text-gray-600 flex items-center mb-1"><MapPin size={14} className="mr-2 text-teal-600"/>{upa.endereco}</p>
              {upa.telefone && <p className="text-sm text-gray-600 flex items-center mb-1"><Phone size={14} className="mr-2 text-teal-600"/>{upa.telefone}</p>}
              {upa.services && upa.services.length > 0 && (
                <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700 mb-1">Serviços:</p>
                    <div className="flex flex-wrap gap-2">
                        {upa.services.map(service => (
                            <span key={service} className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">{service}</span>
                        ))}
                    </div>
                </div>
              )}
              <button 
                onClick={() => openInMaps(upa.endereco, upa.pluscode)}
                className="mt-3 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 transition-colors"
              >
                Ver no Mapa <MapPin size={16} className="ml-2"/>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default UPAsPage;
