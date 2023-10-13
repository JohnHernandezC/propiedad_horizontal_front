import { BASE_API_PUBLIC } from "../../utils/constants";

export async function RecuperacionClaveApi(data) {
    try {
      const url = `${BASE_API_PUBLIC}/auth/users/reset_password/`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify(data),
      };
  
      const response = await fetch(url, params);
      const result = await response.json();
      
      return [result,response];
    } catch (error) {
      throw error;
    }
  }


  export async function ConfirmacionClaveApi(data) {
    try {
      const url = `${BASE_API_PUBLIC}/auth/users/reset_password_confirm/`;
      const params = {
        method: "POST",
        headers: {
  
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
  
      const response = await fetch(url, params);
      const result = await response.json();
      
      return [result,response];
    } catch (error) {
      throw error;
    }
  }

  