import { useState } from "react";
import { useAuth } from "..";
import {
    addTipoDocumentoApi,
    deleteTipoDocumentoApi,
    getTipoDocumentoApi,
    updateTipoDocumentoApi
} from "../../api/GestionDocumental/TipoDocumento";

export  function useTipoDocumento() {
    const { auth } = useAuth();
   
    const [state, setState] = useState({
      loading: true,
      error: null,
      TipoDocumento: null,
      TipoDocumentoDB: null,
    });
  
  
const { loading, error, TipoDocumento, TipoDocumentoDB } = state;


  const getTipoDocumentoDB = async () => {
      try {
        const [result, response] = await getTipoDocumentoApi(auth.token);
        setState((prevState) => ({ ...prevState, TipoDocumentoDB: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, error }));
      }
    };
  
    const getTipoDocumento = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await getTipoDocumentoApi(auth.token);

        setState((prevState) => ({ ...prevState, loading: false, TipoDocumento: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
    
  
    const addTipoDocumento = async (data) => {
     
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await addTipoDocumentoApi(data, auth.token);
       
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const updateTipoDocumento = async (id, data) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await updateTipoDocumentoApi(id, data, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const deleteTipoDocumento = async (id) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await deleteTipoDocumentoApi(id, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
  
   
  
    return {
      loading,
      error,
      TipoDocumento,
      TipoDocumentoDB,
   
      getTipoDocumentoDB,
      getTipoDocumento,
      addTipoDocumento,
      updateTipoDocumento,
      deleteTipoDocumento,
      
    };
  }
  