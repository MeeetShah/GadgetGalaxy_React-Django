import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { apis } from "../api";
import { Link } from "react-router-dom";
import AlertBox from "./AlertBox";
import { cart } from "../features/products";

const Displayspecific = () => {
  const specificproduct = useSelector((state) => state.specificproducts);
  console.log("specific product", specificproduct);
  const login = useSelector((state) => state.login);
  const cartitems = useSelector((state) => state.cart) || [];
  console.log("loggedin = ", login);
  const [cartAlert, setCartAlert] = useState({
    isOpen: false,
    message: "",
  });
  const dispatch = useDispatch();

  const { state } = useLocation();
  console.log(state);

  const addtocart = async (id) => {
    if (!login) {
      setCartAlert({
        isOpen: true,
        message: "You are not logged in! Please login to add product to cart.",
      });
    }
    console.log(login, id);
    let cartData = cartitems;
    if (Array.isArray(cartitems)) {
      cartData =
        cartitems?.filter((cartObj) => {
          return cartObj?.product == id;
        })?.[0] || {};
    }

    if (cartData?.product == id) {
      setCartAlert({
        isOpen: true,
        message: "This Item is already exist in the cart!",
      });
    }
    try {
      const response = await axios.post(apis.addtocart, {
        email: login,
        product: id,
      });
      dispatch(cart(response.data));
      setCartAlert({
        isOpen: true,
        message: "This Item is successfully added to cart.",
      });
    } catch (error) {
      if (error.response) {
        console.log("Internal server error");
      } else {
        console.log("error in addtocart");
      }
    }
  };

  return (
    <>
      <div>
        {cartAlert?.isOpen && (
          <AlertBox
            message={cartAlert?.message}
            onClose={() => {
              setCartAlert({
                isOpen: false,
                message: "",
              });
            }}
            okHandler={() => {
              setCartAlert({
                isOpen: false,
                message: "",
              });
            }}
            closeRequired={true}
          />
        )}
      </div>
      <div className="row">
        {specificproduct?.length > 0 &&
          specificproduct
            .filter((product) => product.category === state.key)
            .map((product) => (
              <div key={product.id}>
                <section style={{ backgroundColor: "#eee" }}>
                  <div className="container py-5">
                    <div className="row justify-content-center">
                      <div className="col-md-12 col-xl-10">
                        <div className="card shadow-0 border rounded-3">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                  <img
                                    src={product.image}
                                    style={{
                                      maxHeight: "200px",
                                      maxWidth: "200px",
                                    }}
                                    className="w-100"
                                  />
                                  <Link to="#!">
                                    <div className="hover-overlay">
                                      <div
                                        className="mask"
                                        style={{
                                          backgroundColor:
                                            "rgba(253, 253, 253, 0.15)",
                                        }}
                                      ></div>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                              <div className="col-md-6 col-lg-6 col-xl-6">
                                <h5>{product.name}</h5>
                                <p className="text-truncate mb-4 mb-md-0">
                                  {product.description}
                                </p>

                                <div className="mt-1 mb-0 text-muted small">
                                  <span>{product.brand}</span>
                                 
                                 
                                  
                                
                                </div>
                                <div className="mb-2 text-muted small">
                                  <span> Warrenty : {product.warranty}</span>
                                  <span className="text-primary"> • </span>

                                  
                                  <span>
                                    Stock : {product.stock}
                                    <br />
                                  </span>
                                </div>
                              </div>
                              <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                <div className="d-flex flex-row align-items-center mb-1">
                                  <h4 className="mb-1 me-1">
                                    Rs.{product.price}
                                  </h4>
                                </div>
                                <h6 className="text-success">Free shipping</h6>
                                <div className="d-flex flex-column mt-4">
                                  <button
                                    data-mdb-button-init
                                    data-mdb-ripple-init
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                  >
                                    Details
                                  </button>
                                  <button
                                    data-mdb-button-init
                                    data-mdb-ripple-init
                                    className="btn btn-outline-primary btn-sm mt-2"
                                    onClick={() => {
                                      addtocart(product.id);
                                    }}
                                    type="button"
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            ))}
      </div>
    </>
  );
};

export default Displayspecific;
