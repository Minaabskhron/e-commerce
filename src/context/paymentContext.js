import axios from 'axios';
import React, { createContext, useContext } from 'react'
import { cartContext } from './cartContext';

export const paymentContext = createContext();


export default function PaymentContextProvider({children}) {

    const {cartId, removeCartData} = useContext(cartContext);

    async function confirmCashPayment(valuesparam)
    {
        try {
            
            const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
                'shippingAddress':valuesparam
            },{
                headers:{'token':localStorage.getItem('token')}
            })
            if (data.status === "success")
            {
                removeCartData();
            }
            return data;

        } catch (error) {
            console.log(error);
        }


    }

    async function confirmOnlinePayment(valuesparam)
    {
        try {
            
            const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,{
                'shippingAddress':valuesparam
            },{
                headers:{'token':localStorage.getItem('token')},
                params:{url:`${window.location.origin}/#`}
            })
            if (data.status === "success")
            {
                window.open(data.session.url,'_self')
                removeCartData()
            }
            return data;

        } catch (error) {
            console.log(error);
        }


    }



    return <paymentContext.Provider value={{confirmCashPayment,confirmOnlinePayment}} >
        {children}
    </paymentContext.Provider>
  
}
