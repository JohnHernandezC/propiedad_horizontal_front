import {BASE_API_PUBLIC } from "../../utils/constants";
import { makeRequest } from "../Request";
const BASE_URL = `${BASE_API_PUBLIC}/`;

  // Función para obtener los datos 
  export async function getBancosApi(token) {
    let url = `${BASE_URL}api/Bancos`;
    return makeRequest(url, "GET", token);
  } 
  // Función para agregar un nuevo dato
  export async function addBancosApi(data, token) {
    const url = `${BASE_URL}api/Bancos/`;
    return makeRequest(url, "POST", token,  data);
  }
  // Función para actualizar los datos 
  export async function updateBancosApi(id, data, token) {
    const url = `${BASE_URL}api/Bancos/${id}/`;
    return makeRequest(url, "PUT", token, data);
  }
  
  // Función para eliminar 
  export async function deleteBancosApi(id, token) {
    const url = `${BASE_URL}api/Bancos/${id}/`;
    return makeRequest(url, "DELETE", token);
  }