import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Auth from "./pages/Auth.jsx";
import { checkLogin, checkLoginProfile } from "./util/Auth.util.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: checkLoginProfile,
  },
  {
    path: "/profile",
    element: <Profile />,
    loader: checkLoginProfile,
  },
  {
    path: "/login",
    element: <Auth />,
    loader: checkLogin,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
