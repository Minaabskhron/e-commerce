import { RouterProvider, createHashRouter,createBrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Brands from './Components/Brands/Brands';
import Catogries from './Components/Categories/Catogries';
import Products from './Components/Products/Products';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import AuthContextProvider from './context/authentication';
import NotFound from './Components/NotFound/NotFound';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';


function App() {
  let routers = createHashRouter([{
    path:"",element:<Layout/>,children:[
    {index:true,element:<ProtectedRoute>
      <Home/> 
    </ProtectedRoute>
     },

    {path:"brands",element:<ProtectedRoute>
    <Brands /> 
    </ProtectedRoute>},

    {path:"Categories",element:<ProtectedRoute>
    <Catogries/>
    </ProtectedRoute>
    },

    {path:"products",element:<ProtectedRoute>
    <Products/> 
    </ProtectedRoute>},

    {path:"Register",element:<Register/> },
    {path:"login", element: <Login/>},
    {path:"*", element: <NotFound/>}
  ]}])
  
  return <>
    <AuthContextProvider>
      <RouterProvider router={routers}/>
    </AuthContextProvider>
    
  </>
   
}

export default App;