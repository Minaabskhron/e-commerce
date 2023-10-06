import axios from "axios";
import { createContext, useState } from "react";
import React from 'react'

export const cartContext = createContext()

export default function CartContextProvider({children}) {

    const [cartProducts, setcartProducts] = useState(null);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [numOfCartItems, setNumOfCartItems] = useState(0);


    async function addProductToCart(productId)
    {
        try
        {
            const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
                "productId":productId
            },
            {
                headers:{token:localStorage.getItem("token")}
            })
            setcartProducts(data.data.products);
            setTotalCartPrice(data.data.totalCartPrice);
            setNumOfCartItems(data.numOfCartItems);

            return data;
        }
        catch(error)
        {
            console.log(error);
        }
    }

  return <cartContext.Provider value={{addProductToCart, cartProducts,numOfCartItems,totalCartPrice}}>
    {children}
  </cartContext.Provider>
  
}
