import {BASE_API_PUBLIC } from "../../utils/constants";
import { makeRequest } from "../Request";
const BASE_URL = `${BASE_API_PUBLIC}/`;
 // Función para obtener los datos 
 export async function getTipoEquiposApi(token) {
  let url = `${BASE_URL}api/tipos_equipos`;
  return makeRequest(url, "GET", token);
} 
  // Función para obtener los datos 
  export async function getEquiposApi(token) {
    let url = `${BASE_URL}api/Equipos`;
    return makeRequest(url, "GET", token);
  } 
  // Función para agregar un nuevo dato
  export async function addEquiposApi(data, token) {
    const url = `${BASE_URL}api/Equipos/`;
    return makeRequest(url, "POST", token,  data);
  }
  // Función para actualizar los datos 
  export async function updateEquiposApi(id, data, token) {
    const url = `${BASE_URL}api/Equipos/${id}/`;
    return makeRequest(url, "PUT", token, data);
  }
  
  // Función para eliminar 
  export async function deleteEquiposApi(id, token) {
    const url = `${BASE_URL}api/Equipos/${id}/`;
    return makeRequest(url, "DELETE", token);
  }