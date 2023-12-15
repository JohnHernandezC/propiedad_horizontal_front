import { useState } from "react";
import { useAuth } from "..";
import {
    addPUC_ColombiaApi,
    deletePUC_ColombiaApi,
    getPUC_ColombiaApi,
    updatePUC_ColombiaApi
} from "../../api/PUC_Colombia/PUC_Colombia";

export  function usePUC_Colombia() {
    const { auth } = useAuth();
   
    const [state, setState] = useState({
      loading: true,
      error: null,
      PUC_Colombia: null,
      PUC_ColombiaDB: null,
    });
  
  
const { loading, error, PUC_Colombia, PUC_ColombiaDB } = state;


  const getPUC_ColombiaDB = async () => {
      try {
        const [result, response] = await getPUC_ColombiaApi(auth.token);
        setState((prevState) => ({ ...prevState, PUC_ColombiaDB: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, error }));
      }
    };
  
    const getPUC_Colombia = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await getPUC_ColombiaApi(auth.token);

        setState((prevState) => ({ ...prevState, loading: false, PUC_Colombia: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
    
  
    const addPUC_Colombia = async (data) => {
     
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await addPUC_ColombiaApi(data, auth.token);
       
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const updatePUC_Colombia = async (id, data) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await updatePUC_ColombiaApi(id, data, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const deletePUC_Colombia = async (id) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await deletePUC_ColombiaApi(id, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
  
   
  
    return {
      loading,
      error,
      PUC_Colombia,
      PUC_ColombiaDB,
   
      getPUC_ColombiaDB,
      getPUC_Colombia,
      addPUC_Colombia,
      updatePUC_Colombia,
      deletePUC_Colombia,
      
    };
  }
  