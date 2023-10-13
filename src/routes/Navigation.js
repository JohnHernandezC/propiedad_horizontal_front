import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
  import {map} from "lodash"
  import routes from "./routes"

  // Este código es un componente de navegación que utiliza la función map 
  // para recorrer un arreglo de rutas y mapearlas para ser utilizadas en la
  //  navegación de la aplicación. El componente utiliza <BrowserRouter> de 
  //  react-router-dom para crear una instancia del navegador y <Routes> que es un componente personalizado. 
  //  Cada ruta tiene un path específico que define la url, un componente para mostrar contenido y un layout para estilizar el componente.
  export function Navigation() {
    return (
      <BrowserRouter>
        <Routes> {/*esto equivale al switch */}
          {map(routes, (route, index) => (
            /* Se recorre el arreglo de rutas y se mapea cada una */
            <Route
              key={index} 
              /* Se asigna una key única para cada elemento para evitar errores en el rendimiento */
              path={route.path} 
              /* Se establece la ruta específica para cada componente */
              element={
                /* Se utiliza element en lugar de component para poder utilizar layouts personalizados */
                /* Se renderiza el componente específico para cada ruta */
                <route.layout> 
                  
                  <route.component  /> 
                  
                </route.layout>
              }
            />
          ))}
       </Routes>
      </BrowserRouter>
    );
  }

