import { RouterProvider, createHashRouter,createBrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Brands from './Components/Brands/Brands';
import Catogries from './Components/Categories/Catogries';
import Products from './Components/Products/Products';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';


function App() {
  let routers = createHashRouter([{
    path:"",element:<Layout/>,children:[
    {index:true,element:<Home/>  },
    {path:"brands",element:<Brands /> },
    {path:"Categories",element:<Catogries/> },
    {path:"products",element:<Products/> },
    {path:"Register",element:<Register/> },
    {path:"login", element: <Login/>}
  ]}])
  
  return <>

    <RouterProvider router={routers}/>
  </>
   
}

export default App;
