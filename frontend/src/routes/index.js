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
import ProductDetails from '../pages/ProductDetails';
import React, { lazy, Suspense } from 'react';

const router = createBrowserRouter([
    {
        path: '',
        element: <App />,
        children: [
            {
                path: '',
                element: (
                    <Suspense fallback={<div>Loading Home...</div>}>
                        <Home />
                    </Suspense>
                ),
            },
            {
                path: 'Login',
                element: (
                    <Suspense fallback={<div>Loading Login...</div>}>
                        <Login />
                    </Suspense>
                ),
            },
            {
                path: 'Forgot-password',
                element: (
                    <Suspense fallback={<div>Loading ForgotPassword...</div>}>
                        <ForgotPassword />
                    </Suspense>
                ),
            },
            {
                path: 'Sign-up',
                element: (
                    <Suspense fallback={<div>Loading SignUp...</div>}>
                        <Signup />
                    </Suspense>
                ),
            },
            {
                path: 'Product-category/:categoryName',
                element: (
                    <Suspense fallback={<div>Loading Category Product...</div>}>
                        <CategoryProduct />
                    </Suspense>
                ),
            },
            {
                path: 'Product/:id',
                element: (
                    <Suspense fallback={<div>Loading Product Details...</div>}>
                        <ProductDetails />
                    </Suspense>
                ),
            },
            {
                path: 'Admin-panel',
                element: (
                    <Suspense fallback={<div>Loading Admin Page...</div>}>
                        <AdminPanel />
                    </Suspense>
                ),
                children: [
                    {
                        path: 'All-users',
                        element: <AllUser />,
                    },
                    {
                        path: 'All-products',
                        element: <AllProducts />,
                    },
                ],
            },
        ],
    },
]);

export default router;
