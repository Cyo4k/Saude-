// Helper para chamadas fetch
export const apiRequest = async (url, method = 'GET', body = null, token = null, isFormData = false) => {
  const API_BASE_URL = 'http://localhost:5000'; // URL base do backend
  const absoluteUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

  const headers = {}; // Começa com headers vazios

  // Só define Content-Type como application/json se não for FormData
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body && (method === 'POST' || method === 'PUT')) {
    // Stringify o corpo apenas se Content-Type for application/json (ou seja, !isFormData)
    options.body = isFormData ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(absoluteUrl, options);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(errorData.message || `Erro ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Erro na requisição ${method} ${absoluteUrl}:`, error);
    throw error; // Re-throw para ser tratado no componente
  }
};