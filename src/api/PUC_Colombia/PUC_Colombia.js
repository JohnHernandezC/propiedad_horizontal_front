import {BASE_API_PUBLIC } from "../../utils/constants";
import { makeRequest } from "../Request";
const BASE_URL = `${BASE_API_PUBLIC}/`;

  // Función para obtener los datos 
  export async function getPUC_ColombiaApi(token) {
    let url = `${BASE_URL}api/PUC_Colombia`;
    return makeRequest(url, "GET", token);
  } 
  // Función para agregar un nuevo dato
  export async function addPUC_ColombiaApi(data, token) {
    const url = `${BASE_URL}api/PUC_Colombia/`;
    return makeRequest(url, "POST", token,  data);
  }
  // Función para actualizar los datos 
  export async function updatePUC_ColombiaApi(id, data, token) {
    const url = `${BASE_URL}api/PUC_Colombia/${id}/`;
    return makeRequest(url, "PUT", token, data);
  }
  
  // Función para eliminar 
  export async function deletePUC_ColombiaApi(id, token) {
    const url = `${BASE_URL}api/PUC_Colombia/${id}/`;
    return makeRequest(url, "DELETE", token);
  }