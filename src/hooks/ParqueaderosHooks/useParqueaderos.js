import { useState } from "react";
import { useAuth } from "..";
import {
    addParqueaderosApi,
    deleteParqueaderosApi,
    getParqueaderosApi,
    updateParqueaderosApi
} from "../../api/Parqueaderos/Parqueaderos";

export  function useParqueaderos() {
    const { auth } = useAuth();
   
    const [state, setState] = useState({
      loading: true,
      error: null,
      Parqueaderos: null,
      ParqueaderosDB: null,
    });
  
  
const { loading, error, Parqueaderos, ParqueaderosDB } = state;


  const getParqueaderosDB = async () => {
      try {
        const [result, response] = await getParqueaderosApi(auth.token);
        setState((prevState) => ({ ...prevState, ParqueaderosDB: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, error }));
      }
    };
  
    const getParqueaderos = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await getParqueaderosApi(auth.token);

        setState((prevState) => ({ ...prevState, loading: false, Parqueaderos: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
    
  
    const addParqueaderos = async (data) => {
     
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await addParqueaderosApi(data, auth.token);
       
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const updateParqueaderos = async (id, data) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await updateParqueaderosApi(id, data, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const deleteParqueaderos = async (id) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await deleteParqueaderosApi(id, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
  
   
  
    return {
      loading,
      error,
      Parqueaderos,
      ParqueaderosDB,
   
      getParqueaderosDB,
      getParqueaderos,
      addParqueaderos,
      updateParqueaderos,
      deleteParqueaderos,
      
    };
  }
  