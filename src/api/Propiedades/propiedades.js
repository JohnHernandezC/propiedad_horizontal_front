import {BASE_API_PUBLIC } from "../../utils/constants";
import { makeRequest } from "../Request";
const BASE_URL = `${BASE_API_PUBLIC}/`;

  // Función para obtener los datos 
  export async function getPropiedadesApi(token) {
    let url = `${BASE_URL}api/Propiedades`;
    return makeRequest(url, "GET", token);
  } 
  export async function getMiPropiedadesApi(token) {
    let url = `${BASE_URL}api/Resgistros/propietario`;
    return makeRequest(url, "GET", token);
  } 
  // Función para agregar un nuevo dato
  export async function addPropiedadesApi(data, token) {
    const url = `${BASE_URL}api/Propiedades/`;
    return makeRequest(url, "POST", token,  data);
  }
  // Función para actualizar los datos 
  export async function updatePropiedadesApi(id, data, token) {
    const url = `${BASE_URL}api/Propiedades/${id}/`;
    return makeRequest(url, "PUT", token, data);
  }
  
  // Función para eliminar 
  export async function deletePropiedadesApi(id, token) {
    const url = `${BASE_URL}api/Propiedades/${id}/`;
    return makeRequest(url, "DELETE", token);
  }