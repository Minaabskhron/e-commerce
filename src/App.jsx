import { RouterProvider, createHashRouter } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import Brands from './Components/Brands/Brands';
import Catogries from './Components/Categories/Catogries';
import Products from './Components/Products/Products';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import AuthContextProvider from './context/authentication';
import NotFound from './Components/NotFound/NotFound';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './Components/ProductsDetails/ProductDetails';
import CartContextProvider from './context/cartContext';
import { Toaster } from 'react-hot-toast';
import Cart from './Components/Cart/Cart';
import Payment from './Components/Payment/Payment';
import AllOrders from './Components/AllOrder/AllOrders';
import Profile from './Components/Profile/Profile';
import PaymentContextProvider from './context/paymentContext';
import ProfileContextProvider from './context/profileContext';
import OrderPreview from './Components/OrderPreview/OrderPreview';




function App() {

  const routers = createHashRouter([{
    path:"",element:<Layout/>,children:[
    {index:true,element:<ProtectedRoute>
      <Products/> 
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

    
    {path:"cart",element:<ProtectedRoute>
    <Cart/> 
    </ProtectedRoute>},

    {path:"profile",element:<ProtectedRoute>
    <Profile/> 
    </ProtectedRoute>},

    {path:"Payment",element:<ProtectedRoute>
    <Payment/> 
    </ProtectedRoute>},

    {path:"ProductDetails/:id",element:<ProtectedRoute>
      <ProductDetails/> 
    </ProtectedRoute>},

    {path:"allorders",element:<ProtectedRoute>
    <AllOrders/> 
    </ProtectedRoute>},

    {path:"Orderpreview",element:<ProtectedRoute>
    <OrderPreview/> 
    </ProtectedRoute>},


    {path:"Register",element:<Register/> },
    {path:"login", element: <Login/>},

    {path:"*", element: <NotFound/>},
  ]}])
  

  const clientQuery = new QueryClient();

  return <>

    <QueryClientProvider  client={clientQuery}>

      
      <ProfileContextProvider>
        <CartContextProvider>
          <PaymentContextProvider>
            <AuthContextProvider>
              <RouterProvider router={routers}/>
            </AuthContextProvider>
          </PaymentContextProvider>
        </CartContextProvider>
      </ProfileContextProvider>
      
      <Toaster/>
      
    </QueryClientProvider>

  </>
   
}

export default App;