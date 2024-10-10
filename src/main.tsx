import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Home from './pages/home.tsx'
import Login from './pages/login.tsx'
import NotFound from './pages/notfound.tsx';
import Register from './pages/register.tsx';

import './index.css'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
