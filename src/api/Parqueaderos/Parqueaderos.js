import {BASE_API_PUBLIC } from "../../utils/constants";
import { makeRequest } from "../Request";
const BASE_URL = `${BASE_API_PUBLIC}/`;

  // Función para obtener los datos 
  export async function getParqueaderosApi(token) {
    let url = `${BASE_URL}api/Parqueaderos`;
    return makeRequest(url, "GET", token);
  } 
  // Función para agregar un nuevo dato
  export async function addParqueaderosApi(data, token) {
    const url = `${BASE_URL}api/Parqueaderos/`;
    return makeRequest(url, "POST", token,  data);
  }
  // Función para actualizar los datos 
  export async function updateParqueaderosApi(id, data, token) {
    const url = `${BASE_URL}api/Parqueaderos/${id}/`;
    return makeRequest(url, "PUT", token, data);
  }
  
  // Función para eliminar 
  export async function deleteParqueaderosApi(id, token) {
    const url = `${BASE_URL}api/Parqueaderos/${id}/`;
    return makeRequest(url, "DELETE", token);
  }