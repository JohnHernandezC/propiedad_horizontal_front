import { useState } from "react";
import { useAuth } from "..";
import {
    addTipoPropiedadApi,
    deleteTipoPropiedadApi,
    getTipoPropiedadApi,
    updateTipoPropiedadApi
} from "../../api/TipoPropiedad/TipoPropiedad";

export  function useTipoPropiedad() {
    const { auth } = useAuth();
   
    const [state, setState] = useState({
      loading: true,
      error: null,
      TipoPropiedad: null,
      TipoPropiedadDB: null,
    });
  
  
const { loading, error, TipoPropiedad, TipoPropiedadDB } = state;


  const getTipoPropiedadDB = async () => {
      try {
        const [result, response] = await getTipoPropiedadApi(auth.token);
        setState((prevState) => ({ ...prevState, TipoPropiedadDB: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, error }));
      }
    };
  
    const getTipoPropiedad = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await getTipoPropiedadApi(auth.token);

        setState((prevState) => ({ ...prevState, loading: false, TipoPropiedad: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
    
  
    const addTipoPropiedad = async (data) => {
     
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await addTipoPropiedadApi(data, auth.token);
       
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const updateTipoPropiedad = async (id, data) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await updateTipoPropiedadApi(id, data, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const deleteTipoPropiedad = async (id) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await deleteTipoPropiedadApi(id, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
  
   
  
    return {
      loading,
      error,
      TipoPropiedad,
      TipoPropiedadDB,
      getTipoPropiedadDB,
      getTipoPropiedad,
      addTipoPropiedad,
      updateTipoPropiedad,
      deleteTipoPropiedad,
      
    };
  }
  