import {BASE_API_PUBLIC } from "../../utils/constants";
import { makeRequest } from "../Request";
const BASE_URL = `${BASE_API_PUBLIC}/`;

  // Función para obtener los datos 
  export async function getAsientoDiarioApi(token) {
    let url = `${BASE_URL}api/AsientoDiario`;
    return makeRequest(url, "GET", token);
  } 
  // Función para agregar un nuevo dato
  export async function addAsientoDiarioApi(data, token) {
    console.log("AsientoDiario",data);
    const url = `${BASE_URL}api/AsientoDiario/`;
    return makeRequest(url, "POST", token,  data);
  }
  // Función para actualizar los datos 
  export async function updateAsientoDiarioApi(id, data, token) {
    const url = `${BASE_URL}api/AsientoDiario/${id}/`;
    return makeRequest(url, "PUT", token, data);
  }
  
  // Función para eliminar 
  export async function deleteAsientoDiarioApi(id, token) {
    const url = `${BASE_URL}api/AsientoDiario/${id}/`;
    return makeRequest(url, "DELETE", token);
  }