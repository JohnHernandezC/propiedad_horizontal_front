import {BASE_API_PUBLIC } from "../../utils/constants";
import { makeRequest } from "../Request";
const BASE_URL = `${BASE_API_PUBLIC}/`;
  // Función para obtener los datos 
  export async function getTipoCuotasApi(token) {
    let url = `${BASE_URL}api/TipoMovimientos`;
    return makeRequest(url, "GET", token);
  } 
  // Función para obtener los datos 
  export async function getCuotasApi(token) {
    let url = `${BASE_URL}api/Cuotas`;
    return makeRequest(url, "GET", token);
  } 
  // Función para agregar un nuevo dato
  export async function addCuotasApi(data, token) {
    const url = `${BASE_URL}api/Cuotas/`;
    return makeRequest(url, "POST", token,  data);
  }
  // Función para actualizar los datos 
  export async function updateCuotasApi(id, data, token) {
    const url = `${BASE_URL}api/Cuotas/${id}/`;
    return makeRequest(url, "PUT", token, data);
  }
  
  // Función para eliminar 
  export async function deleteCuotasApi(id, token) {
    const url = `${BASE_URL}api/Cuotas/${id}/`;
    return makeRequest(url, "DELETE", token);
  }