import { useState } from "react";
import { useAuth } from "..";
import {
    addPropiedadesApi,
    deletePropiedadesApi,
    getPropiedadesApi,
    getMiPropiedadesApi,
    updatePropiedadesApi
} from "../../api/Propiedades/propiedades";

export  function usePropiedades() {
    const { auth } = useAuth();
   
    const [state, setState] = useState({
      loading: true,
      error: null,
      Propiedades: null,
      PropiedadesDB: null,
    });
  
  
const { loading, error, Propiedades, PropiedadesDB } = state;


  const getPropiedadesDB = async () => {
      try {
        const [result, response] = await getPropiedadesApi(auth.token);
        setState((prevState) => ({ ...prevState, PropiedadesDB: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, error }));
      }
    };
  
    const getPropiedades = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await getPropiedadesApi(auth.token);

        setState((prevState) => ({ ...prevState, loading: false, Propiedades: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
    const getMiPropiedades = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await getMiPropiedadesApi(auth.token);

        setState((prevState) => ({ ...prevState, loading: false, Propiedades: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
  
    const addPropiedades = async (data) => {
     
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await addPropiedadesApi(data, auth.token);
       
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const updatePropiedades = async (id, data) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await updatePropiedadesApi(id, data, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const deletePropiedades = async (id) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await deletePropiedadesApi(id, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
  
   
  
    return {
      loading,
      error,
      Propiedades,
      PropiedadesDB,
      getMiPropiedades,
      getPropiedadesDB,
      getPropiedades,
      addPropiedades,
      updatePropiedades,
      deletePropiedades,
      
    };
  }
  