import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";

export const profileContext = createContext()

export default function ProfileContextProvider({children}) {

    const [AllOrders, setAllOrders] = useState([]);
    

    useEffect(() => {
      if (localStorage.getItem('token'))
      {
        const {id} = jwtDecode(localStorage.getItem('token'));
        localStorage.setItem('userId',id);
      }

    }, [])


    async function getAllOrders()
    {
      try {
        const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${localStorage.getItem('userId')}`)
        setAllOrders(data)
        return data;
  
      } catch (error) {
        console.log(error);
      }
    }
  return <profileContext.Provider value={{AllOrders,getAllOrders}}>
    {children}
  </profileContext.Provider>
  
}
