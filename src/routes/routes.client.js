
// layouts
import DashboardLayout from '../layouts/dashboard';




const routesClient = [
  {
    path: "/",
    /*La ruta principal para acceder a la página principal del sitio web */
    layout: DashboardLayout,
    /*Se utiliza el layout específico para clientes */
    component: Home,
    /* El componente que se renderiza en la página es el contenido de la página principal */
  },
  
];
export default routesClient;
