import { Page404 } from "../Pages/Page404";
import SimpleLayout from '../layouts/simple';
import routerAdmin from "./routes.admin";
import routerClient from "./routes.client";
// import { ConfirmacionCredenciales, PaginaAviso,RecuperecionCredenciales } from "../pages/Client";

// Este código es un archivo de rutas que importa dos arreglos de rutas, uno para el administrador y otro para el cliente, 
// y los combina en un solo arreglo de rutas. También se agrega una ruta final para manejar cualquier ruta no especificada, 
// que se renderizará con un componente de error 404. Finalmente, se exporta el arreglo de rutas combinadas para que pueda 
// ser utilizado en otro lugar en la aplicación.
//los 3 puntos devuelven el contenido dentro de las variables 
//En este caso los valores pasariasn de esto [[{},{}],[{},{}]] a esto [{},{},{}] 
const routes=[
    ...routerAdmin, 
    ...routerClient,

    {
        path:"*",
        layout: SimpleLayout,
        component: Page404,
      },
    //   {
    //     path:"/reset_passsword",
    //     layout:BasicLayout,
    //     component: RecuperecionCredenciales,

    // },
    // {
        
    //     path:"/password/reset/confirm/:uid/:token",
    //     layout:BasicLayout,
    //     component: ConfirmacionCredenciales,

    // },
    // {
    //     path: "/confirmacion",
    //     layout: BasicLayout,
    //     component: PaginaAviso,
    //   }


    


];

export default routes;