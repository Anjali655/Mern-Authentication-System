import React from 'react'
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import VerifyEmail from './pages/VerifyEmail.jsx';
import Verify from './pages/Verify.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/verify",
    element: <VerifyEmail />
  },
  {
    path: "/verify/:token",
    element: <Verify />
  },
  {
    path: "/login",
    element: <Login />
  }
])

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App