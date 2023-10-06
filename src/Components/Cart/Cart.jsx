import React, { useContext } from 'react'
import { cartContext } from '../../context/cartContext'
import Loading from '../Loading/Loading';
import './Cart.css'
import toast from 'react-hot-toast';

export default function Cart() {
    
    const {cartProducts,totalCartPrice, deleteProduct,updateCount} = useContext(cartContext);


    async function updateCountCart(productId,count)
    {
      await updateCount(productId,count)
      toast.success('updated successfully')

    }

    async function deleteProductCart(productId)
    {
      await deleteProduct(productId);
      toast.success('item deleted sucessfully');
    }

    if (cartProducts === null)
    {
      return <Loading/>
    }

  return <>
    <div className="container mt-5 cartBgColor p-5">
      <h2>Shop Cart :</h2>
      <h6 className='mainColor'>Total Cart Price : {totalCartPrice} EGP</h6>
      {cartProducts?.map((product,index)=><div key={index} className='row  align-items-center border-bottom border-3 py-2'>
              <div className='col-md-3'>
              <figure>
                <img className='w-75' src={product.product.imageCover} alt={product.product.title} />
              </figure>
              </div>
              <div className='col-md-7'>
                <figcaption>
                  <p>{product.product.title}</p>
                </figcaption>
                <div>
                  <p className='mainColor'>price: {product.price} EGP </p>
                </div>
                  <button className='btn bg-transparent p-0' onClick={()=>{deleteProductCart(product.product.id)}}>
                  <i className="fa-solid fa-trash-can pe-2 mainColor"></i>
                    Remove</button>
              </div>

              <div className='col-md-2 d-flex justify-content-center align-items-center'>
                  <button onClick={()=>{
                    updateCountCart(product.product.id, product.count+1)
                  }} className='btn btn-outline-primary'> + </button>
                  <span className='px-1'>{product.count} </span>
                  <button onClick={()=>{
                    updateCount(product.product.id,product.count-1)
                  }} className='btn btn-outline-primary'> - </button>
              </div>

            </div>
            )}
      </div>
  </>
  
}
