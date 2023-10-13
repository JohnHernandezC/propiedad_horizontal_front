import { useState } from "react";
import {
  getMeApi,
  getUsersApi,
  getUsersAdminApi,
  addUserApi,
  CambioPasswordApi,
  updateUserApi,
  deleteUserApi,
  addUserAdminApi,
  updateUserAdminApi,
  deleteUserAdminApi,
  updateuserPermisos,
} from "../api/user";


import { useAuth } from "./";

export function useUser() {
  //
  const [loading, setLoading] = useState(true);
  //
  const [error, setError] = useState(null);
  //aqui se guardan los usuarios que encuentre la peticion
  const [users, setUsers] = useState(null);
  const [usersDB, setUsersDB] = useState(null);
  const [userMe, setUserMe] = useState(null);
  //traemos los datos de usuario almacenados en sesion

  const { auth, logout } = useAuth();
  //peticion get de usuarios

  /**La función "getMe" es una función asíncrona que obtiene los datos del usuario actual a través de una llamada a la API "getMeApi".
   * El token de autenticación se pasa como parámetro. Si se produce un error, se lanza el error.
   * En caso contrario, se devuelve la respuesta del servidor. */
  const getMe = async (token) => {
    try {
      const response = await getMeApi(token);
      setUserMe(response);
      return response;
    } catch (error) {
      throw error;
    }
  };
  /** La función "updatePassword" es una función asíncrona que actualiza la contraseña de un usuario específico a través de una llamada a la API "CambioPasswordApi".
   * El id del usuario y los datos de la nueva contraseña son pasados como parámetros, junto con el token de autenticación.
   * Si la respuesta del servidor es 400, se verifica si hay errores en la contraseña y se lanza un error con el mensaje de error en caso afirmativo,
   * si no se ejecuta la función "errores". Si la respuesta del servidor es 403, se lanza un error con el mensaje de la función "unauthorizedModal".
   * Si se produce un error, se establece el estado de "error" y se lanza el error. */
  const updatePassword = async (id, data) => {
    try {
      setLoading(true);
      const [result, response] = await CambioPasswordApi(id, data, auth.token);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      throw error;
    }
  };

  const getUsersDB = async () => {
    try {
      const [result, response] = await getUsersApi(auth.token);
      setUsersDB(result);
    } catch (error) {
      setError(error);
    }
  };
  /**  La función "getDocumentosGut" es una función asíncrona que obtiene los datos del cliente a través de una llamada a la API
   *"getDocumentosGutApi". Si la respuesta del servidor es 401, se ejecuta la función "SessionExpired" y se realiza un cierre de
   *sesión. Si la respuesta del servidor es 403, se ejecuta la función "unauthorized". Si se produce un error, se establece el estado de "error". */
  const getUsers = async () => {
    try {
      setLoading(true);
      const [result, response] = await getUsersApi(auth.token);

      setLoading(false);
      setUsers(result);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  /**  La función "getDocumentosGut" es una función asíncrona que obtiene los datos del cliente a través de una llamada a la API
   *"getDocumentosGutApi". Si la respuesta del servidor es 401, se ejecuta la función "SessionExpired" y se realiza un cierre de
   *sesión. Si la respuesta del servidor es 403, se ejecuta la función "unauthorized". Si se produce un error, se establece el estado de "error". */
  const getUsersAdmin = async () => {
    try {
      setLoading(true);
      const [result, response] = await getUsersAdminApi(auth.token);
     

      setLoading(false);
      setUsers(result);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  /** La función "addDocumentosGut" es una función asíncrona que agrega un cliente a través de una llamada a la API "addDocumentosGutApi".
   *Si la respuesta del servidor es 400, se verifica si ya existe un cliente registrado con ese NIT y se lanza un error en caso afirmativo,
   *si no se ejecuta la función "errores". Si la respuesta del servidor es 403, se lanza un error con el mensaje de la función "unauthorizedModal".
   *Si se produce un error, se establece el estado de "error" y se lanza el error. */
  const addUser = async (data) => {
    try {
      setLoading(true);
      const [result, response] = await addUserApi(data, auth.token);
      
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      throw error;
    }
  };
  /** La función "updateDocumentosGut" es una función asíncrona que actualiza los datos de un cliente específico a través de una llamada a la API "updateDocumentosGutApi".
   * Si la respuesta del servidor es 400, se verifica si ya existe un cliente registrado con ese NIT y se lanza un error en caso afirmativo,
   * si no se ejecuta la función "errores". Si la respuesta del servidor es 403, se lanza un error con el mensaje de la función "unauthorizedModal".
   * Si se produce un error, se establece el estado de "error" y se lanza el error. */
  const updateUser = async (id, data) => {
    try {
      setLoading(true);
      const [result, response] = await updateUserApi(id, data, auth.token);
     
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      throw error;
    }
  };
  const updatePermisos = async (id, data) => {
    try {
      setLoading(true);
      const [result, response] = await updateuserPermisos(id, data, auth.token);

      
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      throw error;
    }
  };
  /**La función "deleteDocumentosGut" es una función asíncrona que elimina un cliente específico a través de una llamada a la API "deleteDocumentosGutApi".
   * Si la respuesta del servidor es 403, se lanza un error con el mensaje de la función "unauthorizedModal".
   * Si se produce un error, se establece el estado de "error". */
  const deleteUser = async (id) => {
    try {
      setLoading(true);
      const [result, response] = await deleteUserApi(id, auth.token);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  // Administradores
  //El funcionamiento es similar a los anteriores, la diferencia es que esto es solo para las api de administradores

  const addUserAdmin = async (data) => {
    try {
      setLoading(true);
      const [result, response] = await addUserAdminApi(data, auth.token);
     
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      throw error;
    }
  };

  const updateUserAdmin = async (id, data) => {
    try {
      setLoading(true);
      const [result, response] = await updateUserAdminApi(id, data, auth.token);
      
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      throw error;
    }
  };

  const deleteUserAdmin = async (id) => {
    try {
      setLoading(true);
      const [result, response] = await deleteUserAdminApi(id, auth.token);

     
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    users,
    usersDB,
    userMe,
    getUsersDB,
    getMe,
    getUsers,
    getUsersAdmin,
    addUser,
    updateUser,
    deleteUser,
    addUserAdmin,
    updateUserAdmin,
    deleteUserAdmin,
    updatePassword,
    updatePermisos
  };
}
