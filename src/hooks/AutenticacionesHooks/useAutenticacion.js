import {
  RecuperacionClaveApi,
  ConfirmacionClaveApi,
} from "../../api/A_Autenticaciones/autenticacion";

export function useAutenticacion() {
  //Hook para recupereacion del password
  const PostEmail = async (data) => {
    try {
      const [result, response] = await RecuperacionClaveApi(data);
    } catch (error) {
      throw error;
    }
  };

  //Hook para recupereacion del password
  const ConfirmacionClave = async (data) => {
    try {
      const [result, response] = await ConfirmacionClaveApi(data);
    } catch (error) {
      throw error;
    }
  };

  return {
    PostEmail,
    ConfirmacionClave,
  };
}
