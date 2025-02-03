import { createBrowserRouter } from 'react-router-dom';
import App from '../App'; 
import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import Signup from '../pages/Signup';
import AdminPanel from '../pages/AdminPanel';
import AllUser from '../pages/AllUser';
import AllProducts from '../pages/AllProducts';
import CategoryProduct from '../pages/CategoryProduct';
const router = createBrowserRouter([
    {
        path: "",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "Login",
                element: <Login />
            },
            {
                path: "Forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "Sign-up",
                element: <Signup />
            },
            {
                path: "Product-category/:categoryName",
                element: <CategoryProduct />
            },
            {
                path: "Admin-panel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "All-users",
                        element: <AllUser />
                    },
                    {
                        path: "All-products",
                        element: <AllProducts />
                    },
                ]
            },
        ] 
    }
])

export default router;