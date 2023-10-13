import React, { useContext } from 'react'
import { profileContext } from '../../context/profileContext'


export default function OrderPreview() {
    let order = localStorage.getItem('order');
    order = JSON.parse(order);
    console.log(order);
    

    const {allOrders} = useContext(profileContext)

  return<>
    <div className="container w-75 pt-5">
        {
            order.map((product,index)=>
                <div key={index}>
                    <div className="row align-items-center">
                        <div className="col-sm-1">
                            <figure>
                                <img src={product.product.imageCover} className='w-100' alt="" />
                            </figure>
                        </div>

                        <div className="col-sm-9">
                            <figcaption>
                                <p>{product.product.title}</p>
                            </figcaption>
                        </div>

                        <div className='col-sm-2'>
                            <div>
                                <h6>{product.price} EGP</h6>
                                <h6 className='text-muted'>Qty: {product.count}</h6>
                            </div>
                        </div>
                    </div>
                </div>
                
            )
        }

    </div>
  </>
  
}
