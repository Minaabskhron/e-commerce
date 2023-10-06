import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Products.css'
import Loading from '../Loading/Loading';
import { useQuery } from 'react-query';
import HomeSlider from '../HomeSlider/HomeSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link } from 'react-router-dom'


export default function Products() {

  function getProducts()
  {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const {data, isLoading} = useQuery("allProducts",getProducts)
  
  return <>
  {isLoading? <Loading/>
  :<div className="container py-5">

    <div className='row gx-0'>
      <div className="col-sm-9">
        <div>
          <HomeSlider/>
        </div>
      </div>
      <div className='col-sm-3'>
        <img className='w-100 productimages' src={require('../../assets/Images/slider-2.jpeg')} alt="" />
        <img className='w-100 productimages' src={require('../../assets/Images/blog-img-1.jpeg')} alt="" />
      </div>

    </div>
    
    <div className='my-4'>
      <CategorySlider/>
    </div>
    
    <div className="row gy-3 mt-2">
        {data?.data.data.map((product , index)=><div key={index} 
        
        className="col-md-2">
          <div className='products'>  
            <Link className='text-decoration-none' to={`/productDetails/${product.id}`}>
            
              <img src={product.imageCover} className='w-100 pb-2' alt="product" />  
              <h6 className='mainColor'>{product.category.name}</h6>
              <h6>{product.title.split(" ").slice(0,2).join(" ")}</h6>
              <div className='d-flex justify-content-between align-content-center'>
                <p>{product.price} EGP</p>
                <p><i className="iconColor fa-solid fa-star"></i>{product.ratingsAverage}</p>
                
              </div>
              
            </Link> 
            <button className='btn mainBgColor w-100 btn-light text-white'>add to cart</button>
          </div>
        </div>)}

    </div>
  </div> }

  </>
  
}
