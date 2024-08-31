import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'


const Navbar = () => {
  const names = useSelector(state => state.products)
  const navigate = useNavigate()


  const gotoitem = (id) => {
    navigate("/specificproduct", { state: { key: id } })
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact us</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  products
                </Link>
                <ul className="dropdown-menu" >
                  {
                    names?.length > 0 && names.map((name) => {
                      return <li key={names.id} className="dropdown-item" style={{ cursor: 'pointer' }} onClick={() => gotoitem(name.id)}>{name.name}</li>
                    })
                  }
                </ul>
              </li>


              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </ul>
            <ul className="navbar-nav me-auto mr-0 mb-2">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Signup</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/logout">Logout</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">Cart</Link>
              </li>

            </ul>
          </div>



        </div>
      </nav>
    </>
  )
}

export default Navbar
