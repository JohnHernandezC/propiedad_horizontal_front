import { useState } from "react";
import { useAuth } from "..";
import {
    addMantenimientoEquiposApi,
    deleteMantenimientoEquiposApi,
    getMantenimientoEquiposApi,
    updateMantenimientoEquiposApi
} from "../../api/MantenimientoEquipos/MantenimientoEquipos";

export  function useMantenimientoEquipos() {
    const { auth } = useAuth();
   
    const [state, setState] = useState({
      loading: true,
      error: null,
      MantenimientoEquipos: null,
      MantenimientoEquiposDB: null,
    });
  
  
const { loading, error, MantenimientoEquipos, MantenimientoEquiposDB } = state;


  const getMantenimientoEquiposDB = async () => {
      try {
        const [result, response] = await getMantenimientoEquiposApi(auth.token);
        setState((prevState) => ({ ...prevState, MantenimientoEquiposDB: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, error }));
      }
    };
  
    const getMantenimientoEquipos = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await getMantenimientoEquiposApi(auth.token);

        setState((prevState) => ({ ...prevState, loading: false, MantenimientoEquipos: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
    
  
    const addMantenimientoEquipos = async (data) => {
     
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await addMantenimientoEquiposApi(data, auth.token);
       
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const updateMantenimientoEquipos = async (id, data) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await updateMantenimientoEquiposApi(id, data, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const deleteMantenimientoEquipos = async (id) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await deleteMantenimientoEquiposApi(id, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
  
   
  
    return {
      loading,
      error,
      MantenimientoEquipos,
      MantenimientoEquiposDB,
   
      getMantenimientoEquiposDB,
      getMantenimientoEquipos,
      addMantenimientoEquipos,
      updateMantenimientoEquipos,
      deleteMantenimientoEquipos,
      
    };
  }
  