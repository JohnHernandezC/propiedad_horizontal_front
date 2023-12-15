import { useState } from "react";
import { useAuth } from "..";
import {
    addBancosEdificioApi,
    deleteBancosEdificioApi,
    getBancosEdificioApi,
    updateBancosEdificioApi
} from "../../api/BancosEdificio/BancosEdificio";

export  function useBancosEdificio() {
    const { auth } = useAuth();
   
    const [state, setState] = useState({
      loading: true,
      error: null,
      BancosEdificio: null,
      BancosEdificioDB: null,
    });
  
  
const { loading, error, BancosEdificio, BancosEdificioDB } = state;


  const getBancosEdificioDB = async () => {
      try {
        const [result, response] = await getBancosEdificioApi(auth.token);
        setState((prevState) => ({ ...prevState, BancosEdificioDB: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, error }));
      }
    };
  
    const getBancosEdificio = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await getBancosEdificioApi(auth.token);

        setState((prevState) => ({ ...prevState, loading: false, BancosEdificio: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
    
  
    const addBancosEdificio = async (data) => {
     
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await addBancosEdificioApi(data, auth.token);
       
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const updateBancosEdificio = async (id, data) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await updateBancosEdificioApi(id, data, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const deleteBancosEdificio = async (id) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await deleteBancosEdificioApi(id, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
  
   
  
    return {
      loading,
      error,
      BancosEdificio,
      BancosEdificioDB,
      getBancosEdificioDB,
      getBancosEdificio,
      addBancosEdificio,
      updateBancosEdificio,
      deleteBancosEdificio,
      
    };
  }
  