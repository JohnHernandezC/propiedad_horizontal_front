import { useState } from "react";
import { useAuth } from "..";
import {
    addItemsApi,
    deleteItemsApi,
    getItemsApi,
    updateItemsApi
} from "../../api/Items/Items";

export  function useItems() {
    const { auth } = useAuth();
   
    const [state, setState] = useState({
      loading: true,
      error: null,
      Items: null,
      ItemsDB: null,
    });
  
  
const { loading, error, Items, ItemsDB } = state;


  const getItemsDB = async () => {
      try {
        const [result, response] = await getItemsApi(auth.token);
        setState((prevState) => ({ ...prevState, ItemsDB: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, error }));
      }
    };
  
    const getItems = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await getItemsApi(auth.token);

        setState((prevState) => ({ ...prevState, loading: false, Items: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
    
  
    const addItems = async (data) => {
     
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await addItemsApi(data, auth.token);
       
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const updateItems = async (id, data) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await updateItemsApi(id, data, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const deleteItems = async (id) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await deleteItemsApi(id, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
  
   
  
    return {
      loading,
      error,
      Items,
      ItemsDB,
   
      getItemsDB,
      getItems,
      addItems,
      updateItems,
      deleteItems,
      
    };
  }
  