import axios from "axios";
import { createContext, useEffect, useState } from "react";
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
            if (data.status === 'success')
            {
                setTotalCartPrice(data.data.totalCartPrice);
                setNumOfCartItems(data.numOfCartItems);
                setcartProducts(data.data.products);    
            }

            return data;
        }
        catch(error)
        {
            console.log(error);
        }
    }

    async function getProducts () {
        try {
            const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
                headers:{token:localStorage.getItem('token')}
            })
            if (data.status === 'success')
            {
                setcartProducts(data.data.products);
                setTotalCartPrice(data.data.totalCartPrice);
                setNumOfCartItems(data.numOfCartItems);
                return data;
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        getProducts();  
    
    }, [])
    
    async function deleteProduct(productId)
    {
      try {
       const {data} =  await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
          headers:{'token':localStorage.getItem('token')}
        })
        if (data.status === "success")
        {
            setcartProducts(data.data.products);
            setTotalCartPrice(data.totalCartPrice);
            setNumOfCartItems(data.numOfCartItems);
            return data;
        }
        
      } catch (error) {
        console.log(error);
      }

    }

    async function updateCount(productId, count)
    {
        try {
            const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            "count":count
        },
        {
            headers:{'token':localStorage.getItem('token')}
        })
        if (data.status=="success")
        {
            setNumOfCartItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice);
            setcartProducts(data.data.products);
            return data;
        }

        } catch (error) {
            console.log(error);
        }
    }

  return <cartContext.Provider value={{addProductToCart, cartProducts,numOfCartItems,totalCartPrice,
  getProducts,deleteProduct,updateCount}}>
    {children}
  </cartContext.Provider>
  
}
