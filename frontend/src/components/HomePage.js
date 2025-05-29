import React, { useState, useEffect } from 'react';
import { Home, Syringe, CalendarDays, Pill, Hospital, Menu, Bell, UserCircle } from 'lucide-react';
import { apiRequest } from '../utils/apiRequest';

const HomePage = ({ userName, userId, token }) => {
  const [appointments, setAppointments] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(false);
  const [isLoadingVaccines, setIsLoadingVaccines] = useState(false);
  const [errorAppointments, setErrorAppointments] = useState(null);
  const [errorVaccines, setErrorVaccines] = useState(null);

  const apiAppointmentsUrl = '/api/appointments';
  const apiVaccinesUrl = '/api/vaccines';

  const fetchAppointments = async () => {
    setIsLoadingAppointments(true);
    setErrorAppointments(null);
    try {
      const data = await apiRequest(apiAppointmentsUrl, 'GET', null, token);
      console.log("Dados brutos da API de consultas:", data);
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      const upcoming = data.filter(appt => {
        try {
          const apptDate = new Date(appt.date);
          return apptDate >= new Date(today);
        } catch (e) {
          console.error("Erro ao analisar data da consulta:", appt.date, e);
          return false;
        }
      }).sort((a, b) => new Date(a.date) - new Date(b.date));
      console.log("Consultas futuras filtradas:", upcoming);
      setAppointments(upcoming);
    } catch (err) {
      setErrorAppointments(err.message);
    } finally {
      setIsLoadingAppointments(false);
    }
  };

  const fetchVaccines = async () => {
    setIsLoadingVaccines(true);
    setErrorVaccines(null);
    try {
      const data = await apiRequest(apiVaccinesUrl, 'GET', null, token);
      console.log("Dados brutos da API de vacinas:", data);
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      const upcoming = data.filter(vac => {
        if (!vac.nextDoseDate) return false;
        try {
          const nextDoseDate = new Date(vac.nextDoseDate);
          return nextDoseDate >= new Date(today);
        } catch (e) {
          console.error("Erro ao analisar data da próxima dose da vacina:", vac.nextDoseDate, e);
          return false;
        }
      }).sort((a, b) => new Date(a.nextDoseDate) - new Date(b.nextDoseDate));
      console.log("Próximas vacinas filtradas:", upcoming);
      setVaccines(upcoming);
    } catch (err) {
      setErrorVaccines(err.message);
    } finally {
      setIsLoadingVaccines(false);
    }
  };

  useEffect(() => {
    console.log("useEffect em HomePage acionado. userId:", userId, "token:", token);
    if (userId && token) {
      fetchAppointments();
      fetchVaccines();
    }
  }, [userId, token]);

  useEffect(() => {
    console.log("Estado das vacinas atualizado. isLoadingVaccines:", isLoadingVaccines, "errorVaccines:", errorVaccines, "vaccines:", vaccines);
  }, [vaccines, isLoadingVaccines, errorVaccines]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Bem-vindo(a) ao Saúde+, {userName}!</h2>
      <p className="text-gray-600 mb-6">Seu portal de saúde pessoal. Utilize o menu ao lado para gerenciar suas vacinas, consultas, medicamentos e encontrar unidades de saúde próximas.</p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-medium text-blue-700 mb-2 flex items-center"><Syringe size={24} className="mr-2"/>Próximas Vacinas</h3>
          {isLoadingVaccines && <p className="text-blue-500">Carregando vacinas...</p>}
          {errorVaccines && <p className="text-red-500">Erro ao carregar vacinas: {errorVaccines}</p>}
          {!isLoadingVaccines && !errorVaccines && vaccines.length === 0 ? (
            <p className="text-sm text-gray-700">Nenhuma próxima dose agendada.</p>
          ) : (
            <div className="mt-2 space-y-2">
              {vaccines.map(vac => (
                <div key={vac._id} className="text-sm text-gray-700 border-b border-gray-200 pb-2">
                  <p><span className="font-medium">Vacina:</span> {vac.name}</p>
                  <p><span className="font-medium">Próxima Dose:</span> {new Date(vac.nextDoseDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</p>
                  {vac.dose && <p><span className="font-medium">Dose:</span> {vac.dose}</p>}
                  {vac.notes && <p><span className="font-medium">Notas:</span> {vac.notes}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-medium text-green-700 mb-2 flex items-center"><CalendarDays size={24} className="mr-2"/>Próximas Consultas</h3>
          {isLoadingAppointments && <p className="text-blue-500">Carregando consultas...</p>}
          {errorAppointments && <p className="text-red-500">Erro ao carregar consultas: {errorAppointments}</p>}
          {!isLoadingAppointments && !errorAppointments && appointments.length === 0 ? (
            <p className="text-sm text-gray-700">Nenhuma consulta futura agendada.</p>
          ) : (
            <div className="mt-2 space-y-2">
              {appointments.map(appt => (
                <div key={appt._id} className="text-sm text-gray-700 border-b border-gray-200 pb-2">
                  <p><span className="font-medium">Data:</span> {new Date(appt.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</p>
                  {appt.doctor && <p><span className="font-medium">Médico:</span> {appt.doctor}</p>}
                  {appt.specialty && <p><span className="font-medium">Especialidade:</span> {appt.specialty}</p>}
                  {appt.notes && <p><span className="font-medium">Notas:</span> {appt.notes}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;