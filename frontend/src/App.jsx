import React from 'react'
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import VerifyEmail from './pages/VerifyEmail.jsx';
import Verify from './pages/Verify.jsx';
import Navbar from './components/Navbar.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import VerifyOTP from './pages/VerifyOTP.jsx';
import AuthSuccess from './pages/AuthSuccess.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <Navbar />
      <Home />
    </>
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
  },
  {
    path: "/auth-success",
    element: <AuthSuccess />
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "/verify-otp/:email",
    element: <VerifyOTP />
  },
  {
    path: "/verify-otp/:email",
    element: <VerifyOTP />
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