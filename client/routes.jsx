import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Layout from './components/layout';
import Seat from './components/Seat';
import Movies from './components/Movies';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { element: <Navigate to="/seat" replace /> },
        { path: 'seat', element: <Seat /> },
        { path: 'movies', element: <Movies /> },
        { path: '404', element: <Movies /> },
        { path: '/', element: <Navigate to="/seat" /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
