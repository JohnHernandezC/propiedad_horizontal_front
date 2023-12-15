import { useState } from "react";
import { useAuth } from "..";
import {
    addCuotasApi,
    deleteCuotasApi,
    getCuotasApi,
    updateCuotasApi,
    getTipoCuotasApi
} from "../../api/Cuotas/Cuotas";

export  function useCuotas() {
    const { auth } = useAuth();
   
    const [state, setState] = useState({
      loading: true,
      error: null,
      Cuotas: null,
      CuotasDB: null,
      TipoCuotas: null,
    });
  
  
const { loading, error, Cuotas, CuotasDB,TipoCuotas } = state;

const getTiposCuotasDB = async () => {
  try {
    const [result, response] = await getTipoCuotasApi(auth.token);
    setState((prevState) => ({ ...prevState, TipoCuotas: result }));
  } catch (error) {
    setState((prevState) => ({ ...prevState, error }));
  }
};
  const getCuotasDB = async () => {
      try {
        const [result, response] = await getCuotasApi(auth.token);
        setState((prevState) => ({ ...prevState, CuotasDB: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, error }));
      }
    };
  
    const getCuotas = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await getCuotasApi(auth.token);

        setState((prevState) => ({ ...prevState, loading: false, Cuotas: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
    
  
    const addCuotas = async (data) => {
     
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await addCuotasApi(data, auth.token);
       
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const updateCuotas = async (id, data) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await updateCuotasApi(id, data, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const deleteCuotas = async (id) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await deleteCuotasApi(id, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
  
   
  
    return {
      loading,
      error,
      Cuotas,
      CuotasDB,
      TipoCuotas,
      getTiposCuotasDB,
      getCuotasDB,
      getCuotas,
      addCuotas,
      updateCuotas,
      deleteCuotas,
      
    };
  }
  