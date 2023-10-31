import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider, createHashRouter} from 'react-router-dom';
import {Home} from "./components/pages/home/Home";
import About from "./components/pages/about/About";
import Products from "./components/pages/products/Products";
import Contact from "./components/pages/Contact/Contact";
import Network from "./components/pages/network/Network";
import Login from "./components/pages/login/Login";
import { UserProvider } from './context/UserContext'
import EditProfile from './components/pages/edit-profile/EditProfile';
import WaysToEarn from "./components/pages/ways-to-earn/WaysToEarn";

const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/about",
            element: <About />,
        },
        {
            path: "/products",
            element: <Products />,
        },
        {
            path: "/contact",
            element: <Contact />,
        },
        {
            path: "/network-chart",
            element: <Network />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/edit-profile",
            element: <EditProfile />,
        },
        {
            path: "/ways-to-earn",
            element: <WaysToEarn />,
        }
    ]
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <UserProvider>
          <RouterProvider router={router} />
      </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
