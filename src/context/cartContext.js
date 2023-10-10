import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from 'react'

export const cartContext = createContext()

export default function CartContextProvider({children}) {

    const [cartProducts, setcartProducts] = useState([])
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [cartId, setCartId] = useState(null)



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
                getProducts()
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
                setCartId(data.data._id);
                localStorage.setItem("cartId",data.data._id)
                return data;
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        if(localStorage.getItem("cartId"))
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
            setTotalCartPrice(data.data.totalCartPrice);
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

    async function removeCartData()
    {
      try {
       const {data} =  await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
          headers:{'token':localStorage.getItem('token')}
        })
        if (data.message === "success")
        {
            
            setTotalCartPrice(0);
            setNumOfCartItems(0);
            setcartProducts([]);
            localStorage.removeItem('cartId');
        }
        
      } catch (error) {
        console.log(error);
      }

    }

    

  return <cartContext.Provider value={{addProductToCart, cartProducts,numOfCartItems,totalCartPrice,
  getProducts,deleteProduct,updateCount,removeCartData,cartId}}>
    {children}
  </cartContext.Provider>
  
}
