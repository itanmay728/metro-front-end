import './App.css'
import { createBrowserRouter, RouterProvider, Routes } from "react-router-dom"
// import Layout from './Layout'
import Home from './Pages/Home/Home'

function App() {

  let router = createBrowserRouter([
    {
      path : "/",
      element : <Home />,
      children : []
    }
  ])

  return <RouterProvider router={router}/>
}

export default App
