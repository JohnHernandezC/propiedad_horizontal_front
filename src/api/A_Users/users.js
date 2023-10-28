import {BASE_API_PUBLIC } from "../../utils/constants";
import { makeRequest,makeRequestPublic } from "../Request";
const BASE_URL = `${BASE_API_PUBLIC}/`;

export async function UsersResetPasswordApi(data) {
    let url = `${BASE_URL}auth/users/reset_password/`;
    return makeRequestPublic(url, "POST",  data);
  }

export async function UsersResetConfirmPasswordApi(data) {
    const url = `${BASE_URL}auth/users/reset_password_confirm/`;
    return makeRequestPublic(url, "POST",  data);
  }

export async function UsersCreateApi(data) {
    const url = `${BASE_URL}auth/users/`;
    return makeRequestPublic(url, "POST",  data);
  }

export async function UsersActivateUserApi(data) {
    const url = `${BASE_URL}auth/users/activation/`;
    return makeRequestPublic(url, "POST",  data);
  }


export async function UsersResendActivationApi(data) {
    const url = `${BASE_URL}auth/users/resend_activation/`;
    return makeRequestPublic(url, "POST", data);
  }
  // Función para obtener los datos 
  export async function getUsersApi(token) {
    let url = `${BASE_URL}api/Resgistros`;
    return makeRequest(url, "GET", token);
  } 
  // Función para agregar un nuevo dato
  export async function addUsersApi(data, token,schema) {
    const url = `${BASE_URL}api/Resgistros/`;
    return makeRequest(url, "POST", token,  data);
  }
  // Función para actualizar los datos 
  export async function updateUsersApi(id, data, token,schema) {
    const url = `${BASE_URL}api/Resgistros/${id}/`;
    return makeRequest(url, "PATCH", token, data);
  }
  
  // Función para eliminar 
  export async function deleteUsersApi(id, token,schema) {
    const url = `${BASE_URL}api/Resgistros/${id}/`;
    return makeRequest(url, "DELETE", token);
  }