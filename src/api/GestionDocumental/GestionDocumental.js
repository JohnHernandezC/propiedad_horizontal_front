import {BASE_API_PUBLIC } from "../../utils/constants";
import { makeRequest, makeRequestFormData } from "../Request";
const BASE_URL = `${BASE_API_PUBLIC}/`;

  // Función para obtener los datos 
  export async function getGestionDocumentalApi(token) {
    let url = `${BASE_URL}api/GestionDocumental`;
    return makeRequest(url, "GET", token);
  } 
  // Función para agregar un nuevo dato
  export async function addGestionDocumentalApi(data, token) {
    const formData = new FormData();
    formData.append("tipo_doc", data.tipo_doc);
    if (data.archivo !== null) {
      formData.append("archivo", data.archivo);
    } else {
      formData.append("archivo", "");
    }
    formData.append("num_doc", data.num_doc);
    formData.append("Descripcion", data.Descripcion);
    formData.append("Observacion", data.Observacion);
    formData.append("fecha_documento", data.fecha_documenton);
    formData.append("Estado", data.Estado);
    
    const url = `${BASE_URL}api/GestionDocumental/`;
    return makeRequestFormData(url, "POST", token, formData);
  }
  // Función para actualizar los datos 
  export async function updateGestionDocumentalApi(id, data, token) {
    const url = `${BASE_URL}api/GestionDocumental/${id}/`;
    return makeRequest(url, "PUT", token, data);
  }
  
  // Función para eliminar 
  export async function deleteGestionDocumentalApi(id, token) {
    const url = `${BASE_URL}api/GestionDocumental/${id}/`;
    return makeRequest(url, "DELETE", token);
  }