import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../Navbar.css";

const Navbar = () => {
  const names = useSelector((state) => state.products);
  const navigate = useNavigate();
  const login = useSelector((state) => state.login);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const gotoitem = (id) => {
    navigate("/specificproduct", { state: { key: id } });
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);

    // Filter products based on the search input
    const filteredSuggestions = names.filter((product) =>
      product.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (id) => {
    gotoitem(id);
    setSearchInput(""); // Clear the input after selection
    setSuggestions([]); // Clear suggestions
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <i class="fa-brands fa-gg-circle"></i> GadgetGalaxy
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  <i className="fas fa-home"></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  <i className="fas fa-info-circle"></i> About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  <i className="fas fa-envelope"></i> Contact Us
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <i className="fas fa-box"></i> Products
                </Link>
                <ul className={`dropdown-menu${showDropdown ? " show" : ""}`}>
                  {names?.length > 0 &&
                    names.map((name) => (
                      <li
                        key={name.id}
                        className="dropdown-item"
                        style={{ cursor: "pointer" }}
                        onClick={() => gotoitem(name.id)}
                      >
                        {name.name}
                      </li>
                    ))}
                </ul>
              </li>
              <form
                className="d-flex ms-3"
                role="search"
                style={{ position: "relative" }}
              >
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchInput}
                  onChange={handleSearchChange}
                />
                <button className="btn btn-outline-success" type="submit">
                  <i className="fas fa-search"></i> Search
                </button>
                {suggestions.length > 0 && (
                  <ul className="dropdown-menu show">
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion.id}
                        className="dropdown-item"
                        onClick={() => handleSuggestionClick(suggestion.id)}
                      >
                        {suggestion.name}
                      </li>
                    ))}
                  </ul>
                )}
              </form>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {!login && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="fas fa-sign-in-alt"></i> Login
                  </Link>
                </li>
              )}
              {!login && (
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    <i className="fas fa-user-plus"></i> Signup
                  </Link>
                </li>
              )}
              {login && (
                <li className="nav-item">
                  <Link className="nav-link" to="/logout">
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </Link>
                </li>
              )}
              {login && (
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    <i className="fas fa-shopping-cart"></i> Cart
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
