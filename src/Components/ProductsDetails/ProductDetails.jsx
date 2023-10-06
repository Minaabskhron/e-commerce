import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Loading from '../Loading/Loading'
import { useParams } from 'react-router-dom'

export default function ProductDetails() {

  const {id} = useParams();

  function getProductDetails()
  {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`) //al7agat aly bta4od string btt7at fe backtech
  }
  const {data, isLoading} = useQuery('productDetails', getProductDetails)



  return <>
    {isLoading?<Loading/>:
    <div className="container pt-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-3">
          <div>
            <img className='w-100' src={data?.data.data.imageCover} alt={data?.data.data.title} />
          </div>
        </div>

        <div className='ps-5 col-md-9'>
          <div>
            <h2>{data?.data.data.title}</h2>
            <p className='text-muted'>{data.data.data.description}</p>
            <p>{data.data.data.category.name}</p>
            <h5>Price: {data.data.data.price} EGP</h5>
            <button className='btn w-100 mainBgColor'>+ add to cart</button>
          </div>
        </div>
      </div>
    </div>
   
   }
    
    
    </>
}


