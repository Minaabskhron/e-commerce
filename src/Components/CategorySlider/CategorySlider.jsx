import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { useQuery } from 'react-query';
import './CategorySlider.css'
import Loading from '../Loading/Loading';

export default function CategorySlider() {


    function getCategories()
    {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    }

    const {data, isLoading} = useQuery('allCategories',getCategories ,{
        refetchOnMount:false,
    });

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 2,
        arrows:false
      };

  return <>
  
  <div>

    {isLoading?<Loading/>:<Slider {...settings}>
            {
                data?.data.data.map((category,index)=> <div key={index}>
                <img className='CategoryImage' src={category.image} alt={category.name} />
                <p>{category.name}</p>
              </div>

                )
            }

        </Slider>}

      </div>
  </>
  
}
