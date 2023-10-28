// Importamos las funciones y bibliotecas necesarias de Redux
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// Importamos el archivo que contiene el root reducer (reductor principal)
import rootReducer from './reducers';

// Definimos un estado inicial vacío para nuestra aplicación
const initialState = {};

// Creamos un arreglo middleware que contiene solo 'redux-thunk'.
// Redux Thunk es una biblioteca que nos permite manejar acciones asíncronas en Redux.
const middleware = [thunk];

// Creamos la tienda (store) de Redux. Aquí combinamos nuestro reductor raíz,
// el estado inicial y configuramos las herramientas de desarrollo de Redux
// para facilitar la depuración en el navegador.
const store = createStore(
    rootReducer, // Reductor raíz que combina todos los reductores de la aplicación.
    initialState, // Estado inicial de la aplicación.
    composeWithDevTools(applyMiddleware(...middleware)) // Configuración de las herramientas de desarrollo y middleware.
);

// Exportamos la tienda para que pueda ser utilizada en otros módulos de la aplicación.
export default store;
