import { useState } from "react";
import { useAuth } from "..";
import {
    addEquiposApi,
    deleteEquiposApi,
    getEquiposApi,
    updateEquiposApi,
    getTipoEquiposApi
} from "../../api/Equipos/Equipos";

export  function useEquipos() {
    const { auth } = useAuth();
   
    const [state, setState] = useState({
      loading: true,
      error: null,
      Equipos: null,
      EquiposDB: null,
      TipoEquipos: null,
    });
  
  
const { loading, error, Equipos, EquiposDB,TipoEquipos } = state;


  const getTiposEquiposDB = async () => {
      try {
        const [result, response] = await getTipoEquiposApi(auth.token);
        setState((prevState) => ({ ...prevState, TipoEquipos: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, error }));
      }
    };
    const getEquiposDB = async () => {
      try {
        const [result, response] = await getEquiposApi(auth.token);
        setState((prevState) => ({ ...prevState, EquiposDB: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, error }));
      }
    };
  
    const getEquipos = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await getEquiposApi(auth.token);

        setState((prevState) => ({ ...prevState, loading: false, Equipos: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
    
  
    const addEquipos = async (data) => {
     
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await addEquiposApi(data, auth.token);
       
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const updateEquipos = async (id, data) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await updateEquiposApi(id, data, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const deleteEquipos = async (id) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await deleteEquiposApi(id, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
  
   
  
    return {
      loading,
      error,
      Equipos,
      EquiposDB,
      TipoEquipos,
      getTiposEquiposDB,
      getEquiposDB,
      getEquipos,
      addEquipos,
      updateEquipos,
      deleteEquipos,
      
    };
  }
  