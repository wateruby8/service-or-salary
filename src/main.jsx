import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider  } from 'react-router-dom'

import App from './App.jsx'
import routes from './router/index.jsx';
import './assets/all.scss'

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: routes,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>   

      <RouterProvider router={router} /> 

  </StrictMode>,
)
