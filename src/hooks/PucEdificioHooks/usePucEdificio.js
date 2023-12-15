import { useState } from "react";
import { useAuth } from "..";
import {
    addPucEdificioApi,
    deletePucEdificioApi,
    getPucEdificioApi,
    updatePucEdificioApi
} from "../../api/PucEdificio/PucEdificio";

export  function usePucEdificio() {
    const { auth } = useAuth();
   
    const [state, setState] = useState({
      loading: true,
      error: null,
      PucEdificio: null,
      PucEdificioDB: null,
    });
  
  
const { loading, error, PucEdificio, PucEdificioDB } = state;


  const getPucEdificioDB = async () => {
      try {
        const [result, response] = await getPucEdificioApi(auth.token);
        setState((prevState) => ({ ...prevState, PucEdificioDB: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, error }));
      }
    };
  
    const getPucEdificio = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await getPucEdificioApi(auth.token);

        setState((prevState) => ({ ...prevState, loading: false, PucEdificio: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
    
  
    const addPucEdificio = async (data) => {
 
     
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await addPucEdificioApi(data, auth.token);
       
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const updatePucEdificio = async (id, data) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await updatePucEdificioApi(id, data, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const deletePucEdificio = async (id) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await deletePucEdificioApi(id, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
  
   
  
    return {
      loading,
      error,
      PucEdificio,
      PucEdificioDB,
   
      getPucEdificioDB,
      getPucEdificio,
      addPucEdificio,
      updatePucEdificio,
      deletePucEdificio,
      
    };
  }
  