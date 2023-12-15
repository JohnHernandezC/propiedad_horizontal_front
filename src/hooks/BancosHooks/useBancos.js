import { useState } from "react";
import { useAuth } from "..";
import {
    addBancosApi,
    deleteBancosApi,
    getBancosApi,
    updateBancosApi
} from "../../api/Bancos/Bancos";

export  function useBancos() {
    const { auth } = useAuth();
   
    const [state, setState] = useState({
      loading: true,
      error: null,
      Bancos: null,
      BancosDB: null,
    });
  
  
const { loading, error, Bancos, BancosDB } = state;


  const getBancosDB = async () => {
      try {
        const [result, response] = await getBancosApi(auth.token);
        setState((prevState) => ({ ...prevState, BancosDB: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, error }));
      }
    };
  
    const getBancos = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await getBancosApi(auth.token);

        setState((prevState) => ({ ...prevState, loading: false, Bancos: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
    
  
    const addBancos = async (data) => {
     
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await addBancosApi(data, auth.token);
       
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const updateBancos = async (id, data) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await updateBancosApi(id, data, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const deleteBancos = async (id) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await deleteBancosApi(id, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
  
   
  
    return {
      loading,
      error,
      Bancos,
      BancosDB,
      getBancosDB,
      getBancos,
      addBancos,
      updateBancos,
      deleteBancos,
      
    };
  }
  