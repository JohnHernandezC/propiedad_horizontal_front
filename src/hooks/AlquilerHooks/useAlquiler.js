import { useState } from "react";
import { useAuth } from "..";
import {
    addAlquilerApi,
    deleteAlquilerApi,
    getAlquilerApi,
    updateAlquilerApi
} from "../../api/Alquiler/Alquiler";

export  function useAlquiler() {
    const { auth } = useAuth();
   
    const [state, setState] = useState({
      loading: true,
      error: null,
      Alquiler: null,
      AlquilerDB: null,
    });
  
  
const { loading, error, Alquiler, AlquilerDB } = state;


  const getAlquilerDB = async () => {
      try {
        const [result, response] = await getAlquilerApi(auth.token);
        setState((prevState) => ({ ...prevState, AlquilerDB: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, error }));
      }
    };
  
    const getAlquiler = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await getAlquilerApi(auth.token);

        setState((prevState) => ({ ...prevState, loading: false, Alquiler: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
    
  
    const addAlquiler = async (data) => {
     
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await addAlquilerApi(data, auth.token);
       
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const updateAlquiler = async (id, data) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await updateAlquilerApi(id, data, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const deleteAlquiler = async (id) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await deleteAlquilerApi(id, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
  
   
  
    return {
      loading,
      error,
      Alquiler,
      AlquilerDB,
      getAlquilerDB,
      getAlquiler,
      addAlquiler,
      updateAlquiler,
      deleteAlquiler,
      
    };
  }
  