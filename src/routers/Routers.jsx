import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../authentication/login/Login";
import SignUp from "../authentication/signUp/SignUp";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />
    },
    {
        path:'/sign-up',
        element:<SignUp />
    },
    {
        path:'/login',
        element:<Login />
    },
  ]);
  export default router