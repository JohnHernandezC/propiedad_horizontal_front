import { TOKEN } from "../utils/constants";

// Esta función establece un token en el almacenamiento local del navegador utilizando el nombre de la constante TOKEN
export function setToken(token) {
  localStorage.setItem(TOKEN, token);
}

// Esta función devuelve el token almacenado en el almacenamiento local del navegador utilizando el nombre de la constante TOKEN
export function getToken() {
  return localStorage.getItem(TOKEN);
}

// Esta función elimina el token almacenado en el almacenamiento local del navegador utilizando el nombre de la constante TOKEN
export function removeToken() {
  localStorage.removeItem(TOKEN);
}