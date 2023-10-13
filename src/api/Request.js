// Función auxiliar para realizar solicitudes genéricas
export async function makeRequest(url, method, token, data) {
  
  try {
    const params = {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, params);
    const result = await response.json();

    return [result, response];
  } catch (error) {
    throw error;
  }
}

export async function makeRequestPublic(url, method,data) {
  try {
    const params = {
      method,
      headers: {
        
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, params);
    const result = await response.json();

    return [result, response];
  } catch (error) {
    throw error;
  }
}


export async function makeRequestFormData(url, method, token, data) {
  try {
    const params = {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    };

    const response = await fetch(url, params);
    const result = await response.json();

    return [result, response];
  } catch (error) {
    throw error;
  }
}