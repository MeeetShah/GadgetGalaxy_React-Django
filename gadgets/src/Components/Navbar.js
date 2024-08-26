import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contact us</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  products
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Ultra HD TV</a></li>
                  <li><a className="dropdown-item" href="#">Smart Refrigerator</a></li>
                  <li><a className="dropdown-item" href="#">Bluetooth Speaker</a></li>
                  <li><a className="dropdown-item" href="#">Laptop</a></li>
                  <li><a className="dropdown-item" href="#">Air Conditioner</a></li>
                  <li><a className="dropdown-item" href="#">Smartwatch</a></li>
                  <li><a className="dropdown-item" href="#">Digital Camera</a></li>
                  <li><a className="dropdown-item" href="#">Washing Machine</a></li>
                  <li><a className="dropdown-item" href="#">MobilePhone</a></li>
                </ul>
              </li>


              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </ul>
            <ul className="navbar-nav me-auto mr-0 mb-2">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/login">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/signup">Signup</a>
              </li>
            </ul>
          </div>



        </div>
      </nav>
    </>
  )
}

export default Navbar
