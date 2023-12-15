import { useState } from "react";
import { useAuth } from "..";
import {
    addProveedoresApi,
    deleteProveedoresApi,
    getProveedoresApi,
    updateProveedoresApi
} from "../../api/Proveedores/Proveedores";

export  function useProveedores() {
    const { auth } = useAuth();
   
    const [state, setState] = useState({
      loading: true,
      error: null,
      Proveedores: null,
      ProveedoresDB: null,
    });
  
  
const { loading, error, Proveedores, ProveedoresDB } = state;


  const getProveedoresDB = async () => {
      try {
        const [result, response] = await getProveedoresApi(auth.token);
        setState((prevState) => ({ ...prevState, ProveedoresDB: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, error }));
      }
    };
  
    const getProveedores = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await getProveedoresApi(auth.token);

        setState((prevState) => ({ ...prevState, loading: false, Proveedores: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
    
  
    const addProveedores = async (data) => {
     
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await addProveedoresApi(data, auth.token);
       
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const updateProveedores = async (id, data) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await updateProveedoresApi(id, data, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const deleteProveedores = async (id) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await deleteProveedoresApi(id, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
  
   
  
    return {
      loading,
      error,
      Proveedores,
      ProveedoresDB,
   
      getProveedoresDB,
      getProveedores,
      addProveedores,
      updateProveedores,
      deleteProveedores,
      
    };
  }
  