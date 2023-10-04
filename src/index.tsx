import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider, createHashRouter} from 'react-router-dom';
import TopNavigation from "./components/top-navigation/TopNavigation";


const router = createBrowserRouter([
        {
            path: "/",
            element: <div>Home</div>,
        },
        {
            path: "/ways-to-earn",
            element: <div>Ways to earn</div>,
        },
        {
            path: "/contact",
            element: <div>Contact</div>,
        },
        {
            path: "/network-chart",
            element: <div>Network</div>,
        },
        {
            path: "/login",
            element: <div>Login page</div>,
        }
    ]
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <TopNavigation />
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
