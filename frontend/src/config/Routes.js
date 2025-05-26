import Exercises from '../components/Exercises';
import AdminSchools from '../components/AdminSchools';
import AdminUsers from '../components/AdminUsers';
import MainContent from '../MainContent';

const routes = [
    { path: "/", element: <MainContent /> },
    {
        path: "exercises/:part",  // :part is a route parameter
        element: <Exercises />,
        exact: true,
    },
    {
        path: "admin/schools",  // :part is a route parameter
        element: <AdminSchools />,
        exact: true,
    },
    {
        path: "admin/users",  // :part is a route parameter
        element: <AdminUsers />,
        exact: true,
    },
]

export default routes
