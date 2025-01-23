import { createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import Register from "./pages/Register/Register";

export const router = createBrowserRouter([
    { path: '/', element: <SignIn/>},
    { path: '/register', element: <Register/>}
])