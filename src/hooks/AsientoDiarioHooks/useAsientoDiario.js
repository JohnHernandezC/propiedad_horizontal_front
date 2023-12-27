import { useState } from "react";
import { useAuth } from "..";
import {
    addAsientoDiarioApi,
    deleteAsientoDiarioApi,
    getAsientoDiarioApi,
    updateAsientoDiarioApi
} from "../../api/AsientoDiario/AsientoDiario";

export  function useAsientoDiario() {
    const { auth } = useAuth();
   
    const [state, setState] = useState({
      loading: true,
      error: null,
      AsientoDiario: null,
      AsientoDiarioDB: null,
    });
  
  
const { loading, error, AsientoDiario, AsientoDiarioDB } = state;


  const getAsientoDiarioDB = async () => {
      try {
        const [result, response] = await getAsientoDiarioApi(auth.token);
        setState((prevState) => ({ ...prevState, AsientoDiarioDB: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, error }));
      }
    };
  
    const getAsientoDiario = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await getAsientoDiarioApi(auth.token);

        setState((prevState) => ({ ...prevState, loading: false, AsientoDiario: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
    
  
    const addAsientoDiario = async (data) => {
     
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await addAsientoDiarioApi(data, auth.token);
       
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const updateAsientoDiario = async (id, data) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await updateAsientoDiarioApi(id, data, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const deleteAsientoDiario = async (id) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await deleteAsientoDiarioApi(id, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
  
   
  
    return {
      loading,
      error,
      AsientoDiario,
      AsientoDiarioDB,
      getAsientoDiarioDB,
      getAsientoDiario,
      addAsientoDiario,
      updateAsientoDiario,
      deleteAsientoDiario,
      
    };
  }
  