import { useState } from "react";
import { useAuth } from "..";
import {
    addConfiCuentasApi,
    deleteConfiCuentasApi,
    getConfiCuentasApi,
    updateConfiCuentasApi
} from "../../api/ConfiCuentas/ConfiCuentas";

export  function useConfiCuentas() {
    const { auth } = useAuth();
   
    const [state, setState] = useState({
      loading: true,
      error: null,
      ConfiCuentas: null,
      ConfiCuentasDB: null,
    });
  
  
const { loading, error, ConfiCuentas, ConfiCuentasDB } = state;


  const getConfiCuentasDB = async () => {
      try {
        const [result, response] = await getConfiCuentasApi(auth.token);
        setState((prevState) => ({ ...prevState, ConfiCuentasDB: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, error }));
      }
    };
  
    const getConfiCuentas = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await getConfiCuentasApi(auth.token);

        setState((prevState) => ({ ...prevState, loading: false, ConfiCuentas: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
    
  
    const addConfiCuentas = async (data) => {
     
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await addConfiCuentasApi(data, auth.token);
       
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const updateConfiCuentas = async (id, data) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await updateConfiCuentasApi(id, data, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const deleteConfiCuentas = async (id) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await deleteConfiCuentasApi(id, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
  
   
  
    return {
      loading,
      error,
      ConfiCuentas,
      ConfiCuentasDB,
      getConfiCuentasDB,
      getConfiCuentas,
      addConfiCuentas,
      updateConfiCuentas,
      deleteConfiCuentas,
      
    };
  }
  