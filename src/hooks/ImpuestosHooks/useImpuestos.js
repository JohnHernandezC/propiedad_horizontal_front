import { useState } from "react";
import { useAuth } from "..";
import {
    addImpuestosApi,
    deleteImpuestosApi,
    getImpuestosApi,
    updateImpuestosApi
} from "../../api/Impuestos/Impuestos";

export  function useImpuestos() {
    const { auth } = useAuth();
   
    const [state, setState] = useState({
      loading: true,
      error: null,
      Impuestos: null,
      ImpuestosDB: null,
    });
  
  
const { loading, error, Impuestos, ImpuestosDB } = state;


  const getImpuestosDB = async () => {
      try {
        const [result, response] = await getImpuestosApi(auth.token);
        setState((prevState) => ({ ...prevState, ImpuestosDB: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, error }));
      }
    };
  
    const getImpuestos = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await getImpuestosApi(auth.token);

        setState((prevState) => ({ ...prevState, loading: false, Impuestos: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
    
  
    const addImpuestos = async (data) => {
     
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await addImpuestosApi(data, auth.token);
       
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const updateImpuestos = async (id, data) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await updateImpuestosApi(id, data, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const deleteImpuestos = async (id) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await deleteImpuestosApi(id, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
  
   
  
    return {
      loading,
      error,
      Impuestos,
      ImpuestosDB,
   
      getImpuestosDB,
      getImpuestos,
      addImpuestos,
      updateImpuestos,
      deleteImpuestos,
      
    };
  }
  