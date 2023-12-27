import {BASE_API_PUBLIC } from "../../utils/constants";
import { makeRequest } from "../Request";
const BASE_URL = `${BASE_API_PUBLIC}/`;

  // Función para obtener los datos 
  export async function getAlquilerApi(token) {
    let url = `${BASE_URL}api/Alquiler`;
    return makeRequest(url, "GET", token);
  } 
  // Función para agregar un nuevo dato
  export async function addAlquilerApi(data, token) {
    console.log("ALQUILER",data);
    const url = `${BASE_URL}api/Alquiler/`;
    return makeRequest(url, "POST", token,  data);
  }
  // Función para actualizar los datos 
  export async function updateAlquilerApi(id, data, token) {
    const url = `${BASE_URL}api/Alquiler/${id}/`;
    return makeRequest(url, "PUT", token, data);
  }
  
  // Función para eliminar 
  export async function deleteAlquilerApi(id, token) {
    const url = `${BASE_URL}api/Alquiler/${id}/`;
    return makeRequest(url, "DELETE", token);
  }