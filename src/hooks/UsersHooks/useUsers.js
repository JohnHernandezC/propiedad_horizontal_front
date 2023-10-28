import { useState } from "react";
import { useAuth } from "..";
import { UsersResetPasswordApi, UsersResetConfirmPasswordApi, 
    UsersCreateApi, UsersActivateUserApi,UsersResendActivationApi,getUsersApi,addUsersApi,updateUsersApi,deleteUsersApi } from "../../api/A_Users/users";

export  function useUsers() {
    const { auth } = useAuth();
   
    const [state, setState] = useState({
      loading: true,
      error: null,
      Users: null,
      UsersDB: null,
    });
  
  
    const { loading, error, Users, UsersDB } = state;

    
    const UsersResetPassword = async (data) => {
     
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await UsersResetPasswordApi(data);
       
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
    const UsersResetConfirmPassword = async (data) => {
     
        try {
          setState((prevState) => ({ ...prevState, loading: true }));
          const [result, response] = await UsersResetConfirmPasswordApi(data);
         
          setState((prevState) => ({ ...prevState, loading: false }));
        } catch (error) {
          setState((prevState) => ({ ...prevState, loading: false, error }));
          throw error;
        }
      };
      const UsersCreate = async (data) => {

        try {
          setState((prevState) => ({ ...prevState, loading: true }));
          const [result, response] = await UsersCreateApi(data);
         
          setState((prevState) => ({ ...prevState, loading: false }));
        } catch (error) {
          setState((prevState) => ({ ...prevState, loading: false, error }));
          throw error;
        }
      };
      const UsersActivateUser = async (data) => {
     
        try {
          setState((prevState) => ({ ...prevState, loading: true }));
          const [result, response] = await UsersActivateUserApi(data);
         
          setState((prevState) => ({ ...prevState, loading: false }));
        } catch (error) {
          setState((prevState) => ({ ...prevState, loading: false, error }));
          throw error;
        }
      };
      const UsersResendActivation= async (data) => {
     
        try {
          setState((prevState) => ({ ...prevState, loading: true }));
          const [result, response] = await UsersResendActivationApi(data);
         
          setState((prevState) => ({ ...prevState, loading: false }));
        } catch (error) {
          setState((prevState) => ({ ...prevState, loading: false, error }));
          throw error;
        }
      };

  const getUsersDB = async () => {
      try {
        const [result, response] = await getUsersApi(auth.token);
        setState((prevState) => ({ ...prevState, UsersDB: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, error }));
      }
    };
  
    const getUsers = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await getUsersApi(auth.token);

        setState((prevState) => ({ ...prevState, loading: false, Users: result }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
  
    const addUsers = async (data) => {
     
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await addUsersApi(data, auth.token);
       
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const updateUsers = async (id, data) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await updateUsersApi(id, data, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
        throw error;
      }
    };
  
    const deleteUsers = async (id) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const [result, response] = await deleteUsersApi(id, auth.token);
        setState((prevState) => ({ ...prevState, loading: false }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      }
    };
  
   
  
    return {
      loading,
      error,
      Users,
      UsersDB,
      UsersResetPassword,
      UsersResetConfirmPassword,
      UsersCreate,
      UsersActivateUser,
      UsersResendActivation,
      getUsersDB,
      getUsers,
      addUsers,
      updateUsers,
      deleteUsers,
      
    };
  }
  


//   export  function useUsers() {
//     const { auth } = useAuth();
   
//     const [state, setState] = useState({
//       loading: true,
//       error: null,
//       Users: null,
//       UsersDB: null,
//     });
  
  
//     const { loading, error, Users, UsersDB } = state;
  

//     };
  
//     return {
//       loading,
//       error,
//       UsersDB,
//       Users,
//       getUsersDB,
//       getUsers,
//       addUsers,
//       updateUsers,
//       deleteUsers,
//     };
//   }
  
