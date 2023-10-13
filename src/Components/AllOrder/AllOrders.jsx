import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import Loading from '../Loading/Loading';
import { profileContext } from '../../context/profileContext';
import { Link } from 'react-router-dom';

export default function AllOrders() {

  const {AllOrders,getAllOrders} = useContext(profileContext)

  const {isLoading} = useQuery('allOrders',getAllOrders)
  

  if (isLoading)
  {
    return <Loading/>
  }

  return <>
    <div className="container p-5">
      <h5>Order List</h5>
      <table className='table table-striped text-center mt-4'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Item Quantity</th>
            <th>Amount</th>
            <th>Payment method</th>
            <th>Items</th>
          </tr>
        </thead>
        
        <tbody>
          {AllOrders.map((order,index)=><tr key={index}>
            <td>{order.createdAt.split('T').slice(0,1)}</td>
            <td>{order.cartItems.length}</td>
            <td>{order.totalOrderPrice} EGP</td>
            <td>{order.paymentMethodType}</td>
            <td>
              <Link  to={'/Orderpreview'} onClick={()=>{
                localStorage.setItem('order',JSON.stringify(order.cartItems))
              }} className='btn mainBgColor text-white btn-dark'>view</Link>
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>

    

  </>
  
}
