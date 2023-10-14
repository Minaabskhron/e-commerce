import axios from 'axios'
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

export default function Brands() {

  const [allBrands, setAllBrands] = useState([]);

  async function getCategories()
  {
    const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
    setAllBrands(data.data);
  }
  const {data,isLoading} = useQuery('allCatogries',getCategories)

  if (isLoading)
  {
    return <Loading/>
  }

  return <>
    <div className='container w-75 p-4'>
      <h3>Brands</h3>
      <div className='row pt-4'>
        {allBrands.map((categoty,index)=>
          <div key={index} className='col-md-4 py-3'>
            <div className='text-center'>
                <figure>
                  <img className='w-100 categoriesImage' src={categoty.image} alt="" />
                </figure>
                <figcaption>
                  <Link className='text-decoration-none'>{categoty.name}</Link>
                </figcaption>
            </div>
          </div>
        )}
      </div>
    </div>
  </>
  

}
