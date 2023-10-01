import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/Images/freshcart-logo.svg'
import './NavBar.css'

export default function NavBar() {
  return <>
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <Link className="navbar-brand" to="/">
      <img src={logo} alt="" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">

        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/brands">Brands</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/categories">Categories</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/products">Products</Link>
        </li>
        </ul>

        <ul className='navbar-nav ms-auto mb-2 mb-lg-0 align-items-center'>

          
          <li>
            <i className='me-2 fa-brands fa-instagram'></i>
            <i className='me-2 fa-brands fa-facebook'></i>
            <i className='me-2 fa-brands fa-tiktok'></i>
            <i className='me-2 fa-brands fa-twitter'></i>
            <i className='me-2 fa-brands fa-linkedin'></i>
            <i className='me-2 fa-brands fa-youtube'></i>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Register">Register</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/Login">Login</Link>
          </li>
          
          <li className="nav-item">
            <span className="cursor nav-link" to="/Login">Logout</span>
          </li>

        </ul>
    </div>
  </div>
</nav>
  </>
  
}
