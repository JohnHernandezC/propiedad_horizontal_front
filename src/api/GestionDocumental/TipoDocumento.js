import {BASE_API_PUBLIC } from "../../utils/constants";
import { makeRequest } from "../Request";
const BASE_URL = `${BASE_API_PUBLIC}/`;

  // Función para obtener los datos 
  export async function getTipoDocumentoApi(token) {
    let url = `${BASE_URL}api/Tipo_documental`;
    return makeRequest(url, "GET", token);
  } 
  // Función para agregar un nuevo dato
  export async function addTipoDocumentoApi(data, token) {
    const url = `${BASE_URL}api/Tipo_documental/`;
    return makeRequest(url, "POST", token,  data);
  }
  // Función para actualizar los datos 
  export async function updateTipoDocumentoApi(id, data, token) {
    const url = `${BASE_URL}api/Tipo_documental/${id}/`;
    return makeRequest(url, "PUT", token, data);
  }
  
  // Función para eliminar 
  export async function deleteTipoDocumentoApi(id, token) {
    const url = `${BASE_URL}api/Tipo_documental/${id}/`;
    return makeRequest(url, "DELETE", token);
  }