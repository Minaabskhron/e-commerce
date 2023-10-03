import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'
import './Loading.css'

export default function Loading() {
  return <>
    <div className='vh-100 loadingBgColor d-flex align-items-center justify-content-center'>
        <InfinitySpin 
        width='200'
        color="#4fa94d"/>
    </div>
  </>
  
}
