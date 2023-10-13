import { BASE_API_PUBLIC } from "../utils/constants";
import {  makeRequest ,makeRequestFormData} from "./Request";
const BASE_URL = `${BASE_API_PUBLIC}/`;

/*
  Peticion fetch


  -Peticion para realizar el login el cual retorna un token
  -Peticiones al API getMe el cual guarda los datos del usuario en sesion en una variable de uso global  
  -Peticiones a la aplicacion usuarios con 4  funciones asyncronas basicas para CRUD
  -Se importa y se envian el token necesario para cada peticion (token)
    */
export async function loginDjango(formValue) {
  try {
    const url = `${BASE_API_PUBLIC}/login/`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValue),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    if (response.status !== 200) {
      throw new Error(result.error);
    }
    return result;
  } catch (error) {
    throw error;
  }
}

//recibe el token
//toma el token para hacer una peticion
export async function getMeApi(token) {
  try {
    const url = `${BASE_API_PUBLIC}/usuarios/auth/me/`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);

    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}

// Función para agregar un nuevo dato
export async function getUsersApi(token) {
  const url = `${BASE_URL}usuarios/user_partial`;
  return makeRequest(url, "GET",token);
}

// Función para agregar un nuevo dato
export async function CambioPasswordApi(id, data, token) {
  const url = `${BASE_URL}usuarios/Usuarios_P/${id}/cambio_contraseña/`;
  return makeRequest(url, "POST",token,data);
}

// Función para agregar un nuevo dato
export async function getUsersAdminApi(token) {
  const url = `${BASE_URL}usuarios/usuarioI`;
  return makeRequest(url, "GET",token);
}

//Logica para usuarios
export async function addUserApi(data, token) {
  const formData = new FormData();
    formData.append("tipo_id_pers", data.tipo_id_pers);
    formData.append("identificacion_pers", data.identificacion_pers);
    formData.append("nombres", data.nombres);
    formData.append("apellidos", data.apellidos);
    if (data.foto !== null) {
      formData.append("foto", data.foto);
    } else {
      formData.append("foto", "");
    }
    formData.append("email", data.email);
    formData.append("sexo", data.sexo);
    formData.append("fecha_nacimiento", data.fecha_nacimiento);
    formData.append("celular", data.celular);
    formData.append("telefono", data.telefono);
    
    formData.append("password", data.password);
    formData.append("is_admin", data.is_admin);
    formData.append("is_active", data.is_active);
    formData.append("is_superuser", data.is_superuser);

  const url = `${BASE_URL}usuarios/usuarioI/`;
  return makeRequestFormData(url, "POST", token, formData);
}

// Función para actualizar los datos 
export async function updateUserApi(id, data, token) {
  const formData = new FormData();
    formData.append("tipo_id_pers", data.tipo_id_pers);
    formData.append("identificacion_pers", data.identificacion_pers);
    formData.append("nombres", data.nombres);
    formData.append("apellidos", data.apellidos);
    if (data.foto !== null) {
      formData.append("foto", data.foto);
    }
    formData.append("email", data.email);
    formData.append("sexo", data.sexo);
    formData.append("fecha_nacimiento", data.fecha_nacimiento);
    formData.append("celular", data.celular);
    formData.append("telefono", data.telefono);
    formData.append("is_admin", data.is_admin);
    formData.append("is_active", data.is_active);
    formData.append("is_superuser", data.is_superuser);
    formData.append("is_superadmin", data.is_superadmin);
    formData.append("is_staff", data.is_staff);
  const url = `${BASE_URL}usuarios/Usuarios_P/${id}/`;
  return makeRequestFormData(url, "PATCH", token, formData);
}
export async function updateuserPermisos(id, data, token) {
  
  const url = `${BASE_URL}usuarios/user_partial/${id}/`;
  return makeRequest(url, "PATCH", token, data);
}
// Función para eliminar 
export async function deleteUserApi(id, token) {
  const url = `${BASE_URL}usuarios/Usuarios_P/${id}/`;
  return makeRequest(url, "DELETE", token);
}

//Logica para usuarios Admin


// Función para agregar un nuevo dato
export async function addUserAdminApi(data, token) {
  const formData = new FormData();
    formData.append("tipo_id_pers", data.tipo_id_pers);
    formData.append("identificacion_pers", data.identificacion_pers);
    formData.append("nombres", data.nombres);
    formData.append("apellidos", data.apellidos);
    if (data.foto !== null) {
      formData.append("foto", data.foto);
    } else {
      formData.append("foto", "");
    }
    formData.append("email", data.email);
    formData.append("sexo", data.sexo);
    formData.append("fecha_nacimiento", data.fecha_nacimiento);
    formData.append("celular", data.celular);
    formData.append("telefono", data.telefono);
    formData.append("password", data.password);
    formData.append("configuracion", data.configuracion);
    formData.append("SistemasMedicion", data.SistemasMedicion);
    formData.append("owner", data.owner);
    formData.append("tenant", data.tenant);
    formData.append("is_superuser", data.is_superuser);
    formData.append("is_active", data.is_active);
    formData.append("is_superadmin", data.is_superadmin);

  const url = `${BASE_URL}usuarios/usuarioI/`;
  return makeRequestFormData(url, "POST", token, formData);
}

// Función para actualizar los datos 
export async function updateUserAdminApi(id, data, token) {
  const formData = new FormData();
  formData.append("tipo_id_pers", data.tipo_id_pers);
  formData.append("identificacion_pers", data.identificacion_pers);
  formData.append("nombres", data.nombres);
  formData.append("apellidos", data.apellidos);
  if (data.foto !== null) {
    formData.append("foto", data.foto);
  }
  formData.append("email", data.email);
  formData.append("sexo", data.sexo);
  formData.append("fecha_nacimiento", data.fecha_nacimiento);
  formData.append("celular", data.celular);
  formData.append("telefono", data.telefono);

  formData.append("configuracion", data.configuracion);
  formData.append("SistemasMedicion", data.SistemasMedicion);
  formData.append("owner", data.owner);
  formData.append("is_admin", data.is_admin);
  formData.append("is_active", data.is_active);
  formData.append("is_superuser", data.is_superuser);
  formData.append("is_superadmin", data.is_superadmin);
  formData.append("is_staff", data.is_staff);

  const url = `${BASE_URL}usuarios/usuarioI/${id}/`;
  return makeRequestFormData(url, "PATCH", token, formData);
}


// Función para eliminar 
export async function deleteUserAdminApi(id, token) {
  const url = `${BASE_URL}usuarios/usuarioI/${id}/`;
  return makeRequest(url, "DELETE", token);
}
