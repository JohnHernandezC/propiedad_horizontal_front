import { useState } from "react";
import { useAuth } from "..";
import {
    addGestionDocumentalApi,
    deleteGestionDocumentalApi,
    getGestionDocumentalApi,
    updateGestionDocumentalApi
} from "../../api/GestionDocumental/GestionDocumental";

export  function useGestionDocumental() {
    const { auth } = useAuth();
   
    const [state, setState] = useState({
      loading: true,
      error: null,
      GestionDocumental: null,
      GestionDocumentalDB: null,
    });
  
  
const { loading, error, GestionDocumental, GestionDocumentalDB } = state;


  const getGestionDocumentalDB = async () => {
      try {
        const [result, response] = await getGestionDocumentalApi(auth.token);
        setState((prevState) => ({ ...prevState, GestionDocumentalDB: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, error }));
      }
    };
  
    const getGestionDocumental = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await getGestionDocumentalApi(auth.token);

        setState((prevState) => ({ ...prevState, loading: false, GestionDocumental: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
    
  
    const addGestionDocumental = async (data) => {
     
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await addGestionDocumentalApi(data, auth.token);
       
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const updateGestionDocumental = async (id, data) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await updateGestionDocumentalApi(id, data, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const deleteGestionDocumental = async (id) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await deleteGestionDocumentalApi(id, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
  
   
  
    return {
      loading,
      error,
      GestionDocumental,
      GestionDocumentalDB,
   
      getGestionDocumentalDB,
      getGestionDocumental,
      addGestionDocumental,
      updateGestionDocumental,
      deleteGestionDocumental,
      
    };
  }
  