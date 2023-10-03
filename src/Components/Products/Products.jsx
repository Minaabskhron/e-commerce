import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Products.css'
import Loading from '../Loading/Loading';


export default function Products() {

  const [allproducts, setAllproducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getProducts(){
    setIsLoading(true);
    const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    setAllproducts(data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getProducts();
  }, [])
  

  return <>
  {isLoading? <Loading/>
  :<div className="container py-5">
      <div className="row gy-3">
        {allproducts.map((product , index)=><div key={index} className="col-md-2">
          <div className='products'>
            <img src={product.imageCover} className='w-100 pb-2' alt="product" />  
            <h6 className='mainColor'>{product.category.name}</h6>
            <h6>{product.title.split(" ").slice(0,2).join(" ")}</h6>
            <div className='d-flex justify-content-between align-content-center'>
              <p>{product.price} EGP</p>
              <p><i className="iconColor fa-solid fa-star"></i>{product.ratingsAverage}</p>
            </div>
          </div>          
        </div>)}

      </div>
    </div> }

  </>
  
}
