import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit3, Trash2, Pill as PillIconPage } from 'lucide-react';
import { apiRequest as apiRequestMedications } from '../utils/apiRequest';

const MedicationsPage = ({ userId, token }) => {
    const [medications, setMedications] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newMedication, setNewMedication] = useState({ name: '', dosage: '', frequency: '', notes: '' });
    const [editingMedication, setEditingMedication] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const apiBaseUrl = '/api/medications';

    const fetchMedications = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await apiRequestMedications(apiBaseUrl, 'GET', null, token);
            setMedications(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        if(userId && token) fetchMedications();
    }, [userId, token]);

    const handleAddOrUpdateMedication = async () => {
        if (!newMedication.name || !newMedication.dosage) {
            alert("Nome e dosagem do medicamento são obrigatórios.");
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            if (editingMedication) {
                await apiRequestMedications(`${apiBaseUrl}/${editingMedication._id}`, 'PUT', newMedication, token);
            } else {
                await apiRequestMedications(apiBaseUrl, 'POST', newMedication, token);
            }
            setNewMedication({ name: '', dosage: '', frequency: '', notes: '' });
            setShowModal(false);
            setEditingMedication(null);
            fetchMedications();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteMedication = async (medId) => {
        if (window.confirm("Tem certeza que deseja excluir este medicamento?")) {
            setIsLoading(true);
            setError(null);
            try {
                await apiRequestMedications(`${apiBaseUrl}/${medId}`, 'DELETE', null, token);
                fetchMedications();
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
    };
    
    const openEditModal = (med) => {
        setEditingMedication(med);
        setNewMedication({ ...med });
        setShowModal(true);
    };

    const openAddModal = () => {
        setEditingMedication(null);
        setNewMedication({ name: '', dosage: '', frequency: '', notes: '' });
        setShowModal(true);
    }

    return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Meus Medicamentos</h2>
        <button onClick={openAddModal} className="bg-purple-500 hover:bg-purple-600 text-black font-medium py-2 px-4 rounded-lg flex items-center transition-colors opacity-80 hover:opacity-100" disabled={isLoading}>
          <PlusCircle size={20} className="mr-2" /> Adicionar Medicamento
        </button>
      </div>

      {isLoading && <p className="text-blue-500 text-center py-3">Carregando medicamentos...</p>}
      {error && <p className="text-red-500 text-center py-3">Erro ao carregar medicamentos: {error}</p>}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">{editingMedication ? "Editar Medicamento" : "Adicionar Novo Medicamento"}</h3>
            <input type="text" placeholder="Nome do Medicamento" value={newMedication.name} onChange={(e) => setNewMedication({...newMedication, name: e.target.value})} className="w-full p-2 mb-3 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none" />
            <input type="text" placeholder="Dosagem (ex: 50mg, 1 comprimido)" value={newMedication.dosage} onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})} className="w-full p-2 mb-3 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none" />
            <input type="text" placeholder="Frequência (ex: 1x ao dia)" value={newMedication.frequency} onChange={(e) => setNewMedication({...newMedication, frequency: e.target.value})} className="w-full p-2 mb-3 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none" />
            <p className="text-sm text-gray-700 mb-1">Data de Início</p>
            <input type="date" placeholder="Data de Início" value={newMedication.startDate || ''} onChange={(e) => setNewMedication({...newMedication, startDate: e.target.value})} className="w-full p-2 mb-3 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none" />
            <input type="text" placeholder="Nome do Médico" value={newMedication.doctor || ''} onChange={(e) => setNewMedication({...newMedication, doctor: e.target.value})} className="w-full p-2 mb-3 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none" />
            <textarea placeholder="Observações (opcional)" value={newMedication.notes} onChange={(e) => setNewMedication({...newMedication, notes: e.target.value})} className="w-full p-2 mb-4 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none" rows="3"></textarea>
            <div className="flex justify-end space-x-3">
              <button onClick={() => { setShowModal(false); setEditingMedication(null); setNewMedication({ name: '', dosage: '', frequency: '', notes: '' });}} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">Cancelar</button>
              <button onClick={handleAddOrUpdateMedication} className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors" disabled={isLoading}>{editingMedication ? "Salvar Alterações" : "Adicionar"}</button>
            </div>
          </div>
        </div>
      )}
    
      {!isLoading && !error && medications.length === 0 ? (
         <div className="text-center py-10">
            <PillIconPage size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Nenhum medicamento registrado.</p>
            <p className="text-sm text-gray-400 mt-1">Clique em "Adicionar Medicamento" para começar.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {medications.map((med) => (
            <div key={med._id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="mb-2 sm:mb-0">
                <h3 className="text-base font-medium text-purple-700 sm:text-lg">{med.name}</h3>
                <p className="text-xs text-gray-600 sm:text-sm">Dosagem: {med.dosage}</p>
                {med.frequency && <p className="text-xs text-gray-600 sm:text-sm">Frequência: {med.frequency}</p>}
                {med.notes && <p className="text-xs text-gray-500 mt-1"><i>Obs: {med.notes}</i></p>}
              </div>
              <div className="flex flex-row space-x-2 items-center self-end sm:self-center">
                <button onClick={() => openEditModal(med)} className="p-2 bg-blue-600 text-black hover:bg-blue-700 rounded-full transition-colors opacity-80 hover:opacity-100" title="Editar" disabled={isLoading}>
                    <Edit3 size={16} className="sm:size={18}"/>
                </button>
                <button onClick={() => handleDeleteMedication(med._id)} className="p-2 bg-red-500 text-black hover:bg-red-600 rounded-full transition-colors opacity-80 hover:opacity-100" title="Excluir" disabled={isLoading}>
                    <Trash2 size={16} className="sm:size={18}"/>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    );
};
export default MedicationsPage;
