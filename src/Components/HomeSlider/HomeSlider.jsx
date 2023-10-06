import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './HomeSlider.css'

export default function HomeSlider() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true
      };

  return <>
  
  <div>
        <Slider {...settings}>
          <div>
            <img className='sliderImage' src={require('../../assets/Images/slider-image-1.jpeg')} alt="" />
          </div>
          <div>
            <img className='sliderImage' src={require('../../assets/Images/slider-image-2.jpeg')} alt="" />
          </div>
          <div>
            <img className='sliderImage' src={require('../../assets/Images/slider-image-3.jpeg')} alt="" />
          </div>
        </Slider>
      </div>
  </>
  
}
