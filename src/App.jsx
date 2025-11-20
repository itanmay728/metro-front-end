
import { createBrowserRouter, RouterProvider, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import LayOut from "./LayOut";
import LoginRegister from "./Pages/LoginRegister/LoginRegister";
import About from "./Pages/About/About";

function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <LayOut />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/about",
          element: <About/>
        },
        {
          path: "/login-register",
          element: <LoginRegister />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
