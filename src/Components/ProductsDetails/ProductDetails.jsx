import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query'
import Loading from '../Loading/Loading'
import { useParams } from 'react-router-dom'
import { cartContext } from '../../context/cartContext'
import { RotatingLines } from 'react-loader-spinner'
import toast from 'react-hot-toast'

export default function ProductDetails() {
  
  const {addProductToCart} = useContext(cartContext)

  const [isLoading1, setIsLoading1] = useState(false)

  const {id} = useParams();

  function getProductDetails()
  {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`) //al7agat aly bta5od string btt7at fe backtech
  }
  const {data, isLoading} = useQuery('productDetails', getProductDetails)

  async function addProduct(productId)
  {
    setIsLoading1(true);
    const result = await addProductToCart(productId)
    setIsLoading1(false);
    if (result.status === "success")
    {
      toast.success(result.message,{
        duration:2000,
      })
    }
  }
 
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
            <button onClick={()=>addProduct(data?.data.data.id)} className='btn btn-light text-white w-100 mainBgColor'>
            {isLoading1?<RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="50"
              visible={true}
            />:"+ add to cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
   
   }
    
    
    </>
}


