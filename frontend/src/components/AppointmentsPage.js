import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit3, Trash2, Clock, MapPin, CalendarDays as CalendarIconPage } from 'lucide-react';
import { apiRequest as apiRequestAppointments } from '../utils/apiRequest'; // Alias para evitar conflito se necessário

const AppointmentsPage = ({ userId, token }) => {
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({ doctor: '', specialty: '', date: '', time: '', location: '', status: 'Agendada' });
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiBaseUrl = '/api/appointments';

  const fetchAppointments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiRequestAppointments(apiBaseUrl, 'GET', null, token);
      data.sort((a, b) => new Date(b.date + 'T' + b.time) - new Date(a.date + 'T' + a.time));
      setAppointments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId && token) {
        fetchAppointments();
    }
  }, [userId, token]);

  const handleAddOrUpdateAppointment = async () => {
    if (!newAppointment.doctor || !newAppointment.specialty || !newAppointment.date || !newAppointment.time) {
      alert("Nome do Médico/Clínica, Especialidade, Data e Hora são obrigatórios.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const appointmentData = {
        date: newAppointment.date,
        time: newAppointment.time,
        doctor: newAppointment.doctor,
        specialty: newAppointment.specialty,
        location: newAppointment.location,
        status: newAppointment.status,
        notes: newAppointment.notes
      };

      if (editingAppointment) {
        await apiRequestAppointments(`${apiBaseUrl}/${editingAppointment._id}`, 'PUT', appointmentData, token);
      } else {
        await apiRequestAppointments(apiBaseUrl, 'POST', appointmentData, token);
      }
      setNewAppointment({ doctor: '', specialty: '', date: '', time: '', location: '', status: 'Agendada' });
      setShowModal(false);
      setEditingAppointment(null);
      fetchAppointments();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    if (window.confirm("Tem certeza que deseja excluir esta consulta?")) {
      setIsLoading(true);
      setError(null);
      try {
        await apiRequestAppointments(`${apiBaseUrl}/${appointmentId}`, 'DELETE', null, token);
        fetchAppointments();
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const openEditModal = (appointment) => {
    setEditingAppointment(appointment);
    setNewAppointment({ 
        ...appointment,
        doctor: appointment.doctor || '',
        location: appointment.location || ''
     });
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingAppointment(null);
    setNewAppointment({ 
        doctor: '',
        specialty: '', 
        date: '', 
        time: '', 
        location: '', 
        status: 'Agendada' 
    });
    setShowModal(true);
  }

  const getStatusChip = (status) => {
    switch (status) {
        case 'Agendada': return <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">{status}</span>;
        case 'Realizada': return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">{status}</span>;
        case 'Cancelada': return <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">{status}</span>;
        default: return <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded-full">{status}</span>;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Minhas Consultas</h2>
        <button onClick={openAddModal} className="bg-green-500 hover:bg-green-600 text-black font-medium py-2 px-4 rounded-lg flex items-center transition-colors opacity-80 hover:opacity-100" disabled={isLoading}>
          <PlusCircle size={20} className="mr-2" /> Agendar Consulta
        </button>
      </div>

      {isLoading && <p className="text-blue-500 text-center py-3">Carregando consultas...</p>}
      {error && <p className="text-red-500 text-center py-3">Erro ao carregar consultas: {error}</p>}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">{editingAppointment ? "Editar Consulta" : "Agendar Nova Consulta"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <input type="text" placeholder="Nome do Médico/Clínica" value={newAppointment.doctor} onChange={(e) => setNewAppointment({...newAppointment, doctor: e.target.value})} className="p-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none" />
                <input type="text" placeholder="Especialidade" value={newAppointment.specialty} onChange={(e) => setNewAppointment({...newAppointment, specialty: e.target.value})} className="p-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none" />
                <input type="date" value={newAppointment.date} onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})} className="p-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none" />
                <input type="time" value={newAppointment.time} onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})} className="p-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none" />
            </div>
            <input type="text" placeholder="Local (opcional)" value={newAppointment.location} onChange={(e) => setNewAppointment({...newAppointment, location: e.target.value})} className="w-full p-2 mb-3 border rounded-md focus:ring-2 focus:ring-green-500 outline-none" />
            <select value={newAppointment.status} onChange={(e) => setNewAppointment({...newAppointment, status: e.target.value})} className="w-full p-2 mb-4 border rounded-md focus:ring-2 focus:ring-green-500 outline-none">
                <option value="Agendada">Agendada</option>
                <option value="Realizada">Realizada</option>
                <option value="Cancelada">Cancelada</option>
            </select>
            <div className="flex justify-end space-x-3">
              <button onClick={() => { setShowModal(false); setEditingAppointment(null); setNewAppointment({ doctor: '', specialty: '', date: '', time: '', location: '', status: 'Agendada' });}} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">Cancelar</button>
              <button onClick={handleAddOrUpdateAppointment} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors" disabled={isLoading}>{editingAppointment ? "Salvar Alterações" : "Agendar"}</button>
            </div>
          </div>
        </div>
      )}

      {!isLoading && !error && appointments.length === 0 ? (
         <div className="text-center py-10">
            <CalendarIconPage size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Nenhuma consulta agendada.</p>
            <p className="text-sm text-gray-400 mt-1">Clique em "Agendar Consulta" para começar.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((apt) => (
            <div key={apt._id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start">
                <div className="mb-3 sm:mb-0">
                    <h3 className="text-lg font-medium text-green-700">{apt.specialty}</h3>
                    <p className="text-sm text-gray-800 font-semibold">{apt.doctor}</p>
                    {apt.location && <p className="text-sm text-gray-600 flex items-center"><MapPin size={14} className="mr-1 text-gray-500"/> {apt.location}</p>}
                    {console.log('Debugging date:', apt.date, 'time:', apt.time, 'doctor:', apt.doctor, 'location:', apt.location)}
                    <p className="text-sm text-gray-600 flex items-center"><Clock size={14} className="mr-1 text-gray-500"/> {new Date(apt.date).toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })} às {apt.time}</p>
                </div>
                <div className="flex flex-col items-start sm:items-end space-y-2 self-start sm:self-auto">
                    {getStatusChip(apt.status)}
                    <div className="flex space-x-2">
                        <button onClick={() => openEditModal(apt)} className="p-2 bg-blue-600 text-black hover:bg-blue-700 rounded-full transition-colors opacity-80 hover:opacity-100" title="Editar" disabled={isLoading}>
                            <Edit3 size={18}/>
                        </button>
                        <button onClick={() => handleDeleteAppointment(apt._id)} className="p-2 bg-red-500 text-black hover:bg-red-600 rounded-full transition-colors opacity-80 hover:opacity-100" title="Excluir" disabled={isLoading}>
                            <Trash2 size={18}/>
                        </button>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default AppointmentsPage;
