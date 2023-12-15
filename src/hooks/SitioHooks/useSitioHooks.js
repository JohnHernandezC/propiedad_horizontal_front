import { useState } from "react";
import { useAuth } from "..";
import {
    addSitioApi,
    deleteSitioApi,
    getSitioApi,
    updateSitioApi
} from "../../api/Sitio/Sitio";

export  function useSitio() {
    const { auth } = useAuth();
   
    const [state, setState] = useState({
      loading: true,
      error: null,
      Sitio: null,
      SitioDB: null,
    });
  
  
const { loading, error, Sitio, SitioDB } = state;


  const getSitioDB = async () => {
      try {
        const [result, response] = await getSitioApi(auth.token);
        setState((prevState) => ({ ...prevState, SitioDB: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, error }));
      }
    };
  
    const getSitio = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await getSitioApi(auth.token);

        setState((prevState) => ({ ...prevState, loading: false, Sitio: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
    
  
    const addSitio = async (data) => {
     
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await addSitioApi(data, auth.token);
       
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const updateSitio = async (id, data) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await updateSitioApi(id, data, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const deleteSitio = async (id) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await deleteSitioApi(id, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
  
   
  
    return {
      loading,
      error,
      Sitio,
      SitioDB,
   
      getSitioDB,
      getSitio,
      addSitio,
      updateSitio,
      deleteSitio,
      
    };
  }
  