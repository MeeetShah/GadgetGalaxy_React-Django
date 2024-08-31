import React, { useEffect } from 'react'
import { apis } from '../api'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { cart, specificproduct as updateSpecificProduct } from '../features/products'
import { cart as updateCart } from '../features/products'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faHeart, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'


const Cartpage = () => {
    const email = useSelector(state => state.login)
    const specificproduct = useSelector(state => state.specificproducts)
    console.log("specific product", specificproduct);
    const cartitems = useSelector(state => state.cart) || []  // Ensure this is always an array
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchCartItems = async () => {
        console.log("Fetching cart items for email:", email);

        try {
            const response = await axios.get(apis.getcartitems, {
                params: { email },
            });

            const cartItems = response.data;

            // Dispatch action to update cart in Redux store
            dispatch(updateCart(cartItems));

        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    }

    useEffect(() => {
        if (email) {
            fetchCartItems();  // Fetch cart items when email is available
        }
    }, [email]);

    console.log("Cart items i have:", cartitems);
    console.log("specific items i have:", specificproduct);

    const removefromcart = async (id) => {
        try {
            const response = await axios.post(apis.removefromcart, {
                email: email,
                product: id
            });

            // After successful response, update the cart in the Redux store
            const updatedCart = cartitems.filter(item => item.product !== id);

            // Dispatch action to update the cart state in Redux
            dispatch(updateCart(updatedCart));

            // setMessage(`Signup successful. Token: ${response.data.token}`);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.error);

            } else {
                console.log("error accures please try again");

            }
        }
    }

    const changeinquantity = async (id, quantity) => {
        console.log("for quantity", id, quantity);

        try {
            const response = await axios.post(apis.changeinquantity, {
                email: email,
                product: id,
                quantity: quantity
            });
            const updatedCart = cartitems.map(item =>
                item.product === id ? { ...item, quantity: quantity } : item
            );

            dispatch(updateCart(updatedCart));

            // setMessage(`Signup successful. Token: ${response.data.token}`);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.error);

            } else {
                console.log("error accures please try again");

            }
        }

    }



    return (
        <section className="h-100 gradient-custom">
            <div className="container py-5">
                <div className="row d-flex justify-content-center my-4">
                    <div className="col-md-8">
                        <div className="card mb-4">
                            <div className="card-header py-3">
                                <h5 className="mb-0">Your Cart</h5>
                            </div>
                            <div className="card-body">
                                {cartitems.length > 0 ? (
                                    cartitems.map((item) => {
                                        // Use optional chaining to safely access specificproducts
                                        const productDetails = specificproduct?.find(
                                            (product) => product.id === item.product
                                        );

                                        return productDetails ? (
                                            <div className="row" key={productDetails.id}>
                                                <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                                    <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                                        <img src={productDetails.image || "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/12a.webp"}
                                                            className="w-100" alt={productDetails.name} />
                                                        <Link to="/">
                                                            <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                                                        </Link>
                                                    </div>
                                                </div>

                                                <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                                    <p><strong>{productDetails.name}</strong></p>
                                                    <p>Description : {productDetails.description}</p>
                                                    <p>Stock: {productDetails.stock}</p>
                                                    <p>Brand: {productDetails.brand}</p>
                                                    <button type="button" className="btn btn-primary btn-sm me-1 mb-2" onClick={() => removefromcart(productDetails.id)} title="Remove item">
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                    <button type="button" className="btn btn-danger btn-sm mb-2" title="Move to the wish list">
                                                        <FontAwesomeIcon icon={faHeart} />
                                                    </button>
                                                </div>

                                                <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                                    <div className="d-flex mb-4" style={{ maxWidth: '300px' }}>
                                                        <button className="btn btn-primary px-3 me-2" onClick={() => { changeinquantity(productDetails.id, item.quantity - 1) }}
                                                        >
                                                            <FontAwesomeIcon icon={faMinus} />
                                                        </button>

                                                        <div className="form-outline">
                                                            <input id="form1" min="0" name="quantity" value={item.quantity} type="number" className="form-control" />
                                                            <label className="form-label" htmlFor="form1">Quantity</label>
                                                        </div>

                                                        <button className="btn btn-primary px-3 ms-2"
                                                            onClick={() => { changeinquantity(productDetails.id, item.quantity + 1) }}>
                                                            <FontAwesomeIcon icon={faPlus} />
                                                        </button>
                                                    </div>

                                                    <p className="text-start text-md-center">
                                                        <strong>${productDetails.price || '0.00'}</strong>
                                                    </p>
                                                </div>
                                                <hr className="my-4" />
                                            </div>

                                        ) : null;  // Return null if no matching product found
                                    })
                                ) : (
                                    <p>Your cart is empty</p>
                                )}

                                <div class="card mb-4 mb-lg-0">
                                    <div class="card-body">
                                        <p><strong>We accept</strong></p>
                                        <img class="me-2" width="45px"
                                            src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                            alt="Visa" />
                                        <img class="me-2" width="45px"
                                            src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                                            alt="American Express" />
                                        <img class="me-2" width="45px"
                                            src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                            alt="Mastercard" />
                                     
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card mb-4">
                                    <div class="card-header py-3">
                                        <h5 class="mb-0">Summary</h5>
                                    </div>
                                    <div class="card-body">
                                        <ul class="list-group list-group-flush">
                                            <li
                                                class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                Products
                                                <span>$53.98</span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                                Shipping
                                                <span>Gratis</span>
                                            </li>
                                            <li
                                                class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                <div>
                                                    <strong>Total amount</strong>
                                                    <strong>
                                                        <p class="mb-0">(including VAT)</p>
                                                    </strong>
                                                </div>
                                                <span><strong>$53.98</strong></span>
                                            </li>
                                        </ul>

                                        <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg btn-block">
                                            Go to checkout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </section >
    )
}

export default Cartpage;
