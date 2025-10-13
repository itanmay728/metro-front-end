import './App.css'
import { createBrowserRouter, RouterProvider, Routes } from "react-router-dom"
import Layout from './Layout'
import Home from './Pages/Home/Home'

function App() {

  let router = createBrowserRouter([
    {
      path : "/",
      element : <Layout/>,
      children : [
        {
          path : "/",
          element : <Home />,
        },
      ]
    }
  ])

  return <RouterProvider router={router}/>
}

export default App
