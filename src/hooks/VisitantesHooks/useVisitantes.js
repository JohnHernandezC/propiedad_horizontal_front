import { useState } from "react";
import { useAuth } from "..";
import {
    addVisitantesApi,
    deleteVisitantesApi,
    getVisitantesApi,
    updateVisitantesApi
} from "../../api/Visitantes/Visitantes";

export  function useVisitantes() {
    const { auth } = useAuth();
   
    const [state, setState] = useState({
      loading: true,
      error: null,
      Visitantes: null,
      VisitantesDB: null,
    });
  
  
const { loading, error, Visitantes, VisitantesDB } = state;


  const getVisitantesDB = async () => {
      try {
        const [result, response] = await getVisitantesApi(auth.token);
        setState((prevState) => ({ ...prevState, VisitantesDB: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, error }));
      }
    };
  
    const getVisitantes = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await getVisitantesApi(auth.token);

        setState((prevState) => ({ ...prevState, loading: false, Visitantes: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
    
  
    const addVisitantes = async (data) => {
     
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await addVisitantesApi(data, auth.token);
       
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const updateVisitantes = async (id, data) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await updateVisitantesApi(id, data, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const deleteVisitantes = async (id) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await deleteVisitantesApi(id, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
  
   
  
    return {
      loading,
      error,
      Visitantes,
      VisitantesDB,
   
      getVisitantesDB,
      getVisitantes,
      addVisitantes,
      updateVisitantes,
      deleteVisitantes,
      
    };
  }
  