import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit3, Trash2, Syringe as SyringeIconPage } from 'lucide-react';
import { apiRequest } from '../utils/apiRequest'; // Importando o helper

const VaccinesPage = ({ userId, token }) => {
  const [vaccines, setVaccines] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newVaccine, setNewVaccine] = useState({ name: '', date: '', dose: '', nextDoseDate: '', notes: '' });
  const [editingVaccine, setEditingVaccine] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiBaseUrl = '/api/vaccines';

  const fetchVaccines = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiRequest(`${apiBaseUrl}`, 'GET', null, token);
      setVaccines(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId && token) {
        fetchVaccines();
    }
  }, [userId, token]);

  const handleAddOrUpdateVaccine = async () => {
    if (!newVaccine.name || !newVaccine.date) {
      alert("Nome da vacina e data são obrigatórios.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      if (editingVaccine) {
        await apiRequest(`${apiBaseUrl}/${editingVaccine._id}`, 'PUT', newVaccine, token);
      } else {
        await apiRequest(apiBaseUrl, 'POST', newVaccine, token);
      }
      setNewVaccine({ name: '', date: '', dose: '', nextDoseDate: '', notes: '' });
      setShowModal(false);
      setEditingVaccine(null);
      fetchVaccines();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteVaccine = async (vaccineId) => {
    // Idealmente, substitua window.confirm por um modal de confirmação não bloqueante
    if (window.confirm("Tem certeza que deseja excluir esta vacina?")) {
      setIsLoading(true);
      setError(null);
      try {
        await apiRequest(`${apiBaseUrl}/${vaccineId}`, 'DELETE', null, token);
        fetchVaccines();
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const openEditModal = (vaccine) => {
    setEditingVaccine(vaccine);
    setNewVaccine({ 
        ...vaccine,
        name: vaccine.name || '', 
        date: vaccine.date || '', 
        dose: vaccine.dose || '', 
        nextDoseDate: vaccine.nextDoseDate || '',
        notes: vaccine.notes || ''
    });
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingVaccine(null);
    setNewVaccine({ name: '', date: '', dose: '', nextDoseDate: '', notes: '' });
    setShowModal(true);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Minhas Vacinas</h2>
        <button
          onClick={openAddModal}
          className="bg-blue-500 hover:bg-blue-600 text-black font-medium py-2 px-4 rounded-lg flex items-center transition-colors opacity-80 hover:opacity-100"
          disabled={isLoading}
        >
          <PlusCircle size={20} className="mr-2" /> Adicionar Vacina
        </button>
      </div>

      {isLoading && <p className="text-blue-500 text-center py-3">Carregando vacinas...</p>}
      {error && <p className="text-red-500 text-center py-3">Erro ao carregar vacinas: {error}</p>}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">{editingVaccine ? "Editar Vacina" : "Adicionar Nova Vacina"}</h3>
            <input type="text" placeholder="Nome da Vacina" value={newVaccine.name} onChange={(e) => setNewVaccine({...newVaccine, name: e.target.value})} className="w-full p-2 mb-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
            <p className="text-sm text-gray-700 mb-1">Data de Aplicação</p>
            <input type="date" placeholder="Data de Aplicação" value={newVaccine.date} onChange={(e) => setNewVaccine({...newVaccine, date: e.target.value})} className="w-full p-2 mb-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
            <input type="text" placeholder="Dose (ex: Dose Única, 1ª Dose)" value={newVaccine.dose} onChange={(e) => setNewVaccine({...newVaccine, dose: e.target.value})} className="w-full p-2 mb-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
            <p className="text-sm text-gray-700 mb-1">Data da Próxima Dose (opcional)</p>
            <input type="date" placeholder="Data da Próxima Dose (opcional)" value={newVaccine.nextDoseDate} onChange={(e) => setNewVaccine({...newVaccine, nextDoseDate: e.target.value})} className="w-full p-2 mb-4 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
            <textarea placeholder="Observações (opcional)" value={newVaccine.notes} onChange={(e) => setNewVaccine({...newVaccine, notes: e.target.value})} className="w-full p-2 mb-4 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" rows="3"></textarea>
            <div className="flex justify-end space-x-3">
              <button onClick={() => { setShowModal(false); setEditingVaccine(null); setNewVaccine({ name: '', date: '', dose: '', nextDoseDate: '', notes: '' });}} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">Cancelar</button>
              <button onClick={handleAddOrUpdateVaccine} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors" disabled={isLoading}>{editingVaccine ? "Salvar Alterações" : "Adicionar"}</button>
            </div>
          </div>
        </div>
      )}

      {!isLoading && !error && vaccines.length === 0 ? (
         <div className="text-center py-10">
            <SyringeIconPage size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Nenhuma vacina registrada ainda.</p>
            <p className="text-sm text-gray-400 mt-1">Clique em "Adicionar Vacina" para começar.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {vaccines.map((vaccine) => (
            <div key={vaccine._id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="mb-2 sm:mb-0">
                <h3 className="text-lg font-medium text-blue-700">{vaccine.name}</h3>
                <p className="text-sm text-gray-600">Data: {new Date(vaccine.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</p>
                {vaccine.dose && <p className="text-sm text-gray-600">Dose: {vaccine.dose}</p>}
                {vaccine.nextDoseDate && <p className="text-sm text-orange-600">Próxima dose: {new Date(vaccine.nextDoseDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</p>}
                {vaccine.notes && <p className="text-sm text-gray-600">Observações: {vaccine.notes}</p>}
              </div>
              <div className="flex space-x-2 self-end sm:self-center">
                <button onClick={() => openEditModal(vaccine)} className="p-2 bg-blue-600 text-black hover:bg-blue-700 rounded-full transition-colors opacity-80 hover:opacity-100" title="Editar" disabled={isLoading}>
                    <Edit3 size={18}/>
                </button>
                <button onClick={() => handleDeleteVaccine(vaccine._id)} className="p-2 bg-red-500 text-black hover:bg-red-600 rounded-full transition-colors opacity-80 hover:opacity-100" title="Excluir" disabled={isLoading}>
                    <Trash2 size={18}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default VaccinesPage;
