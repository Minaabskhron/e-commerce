import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { cartContext } from '../../context/cartContext'
import axios from 'axios'

export default function Payment() {

    const {cartId} = useContext(cartContext)

    async function confirmCashPayment(values)
    {
        try {
            
            const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
                'shippingAddress':values
            },{
                headers:{'token':localStorage.getItem('token')}
            })

        } catch (error) {
            console.log(error);
        }

    }

    const formikObj = useFormik(
        {
            initialValues:{
                phone:"",
                city:"",
                details:""
            },
            onSubmit:confirmCashPayment,
            validate:function(values)
            {
                const errors={}
                const phoneRegex = /^(02)?01[0125][0-9]{8}$/
                const cityRegex = /^[A-Z||a-z]{3,10}$/
                if (!phoneRegex.test(values.phone))
                {
                    errors.phone = "Enter a valid phone"
                }
                if (!values.city.match(cityRegex))
                {
                    errors.city = "Enter a valid city"
                }
                return errors
            }
        }
    )

  return <>
  <div className="container mt-3">
    <div className='w-75 m-auto'>
        <h4>Shipping details: </h4>
        <form onSubmit={formikObj.handleSubmit}>
            <label htmlFor="phone" className='mt-3'>Phone: </label>
            <input type="tel" onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.phone} id="phone" className='form-control my-2' />
            {formikObj.errors.phone && formikObj.touched.phone?<div className="alert alert-danger">{formikObj.errors.phone}</div>: " "}
            
            <label htmlFor="city" className='mt-3'>City: </label>
            <input type="text" onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.city} id="city" className='form-control my-2 ' />
            {formikObj.errors.city && formikObj.touched.city?<div className='alert alert-danger'>{formikObj.errors.city}</div>: " "}
            
            <label htmlFor="details" className='mt-3'>Details: </label>
            <input type="text" onChange={formikObj.handleChange} value={formikObj.values.details} id="details" className='form-control mt-2' />

            <button type='submit' disabled={formikObj.isValid == false || formikObj.dirty == false} className='btn btn-danger mt-3'>Confirm details</button>
        </form>
    </div>

  </div>

  </>
}
