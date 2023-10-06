import React, { useContext } from 'react'
import { cartContext } from '../../context/cartContext'

export default function Cart() {
    
    const {cartProducts,numOfCartItems,totalCartPrice} = useContext(cartContext);


  return <>
    <div className="container">
        <div>
        </div>
    </div>
  </>
  
}
