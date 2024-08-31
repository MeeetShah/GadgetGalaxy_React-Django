import React, { useEffect } from 'react'
import { apis } from '../api'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import { cart as updateCart } from '../features/products'



const Cartpage = () => {
    const email = useSelector(state => state.login)

    const dispatch = useDispatch()

    const cart = async () => {
        console.log("into cart method", email);


        try {
            const response = await axios.get(apis.getcartitems, {
                params: { email },
            });

            const wishlistItems = response.data;

            // Dispatch actions to update wishlist and cart
            dispatch(updateCart(wishlistItems));

        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }

    }

    useEffect(() => {
        if (email) {
            cart();  // Call the fetch function
        }
    }, [email]);

    const cartitems = useSelector(state => state.cart)
    console.log("items in carts = ", cartitems);


    return (
        <>

            <section class="h-100 gradient-custom">
                <div class="container py-5">
                    <div class="row d-flex justify-content-center my-4">
                        <div class="col-md-8">
                            <div class="card mb-4">
                                <div class="card-header py-3">
                                    <h5 class="mb-0"></h5>
                                </div>
                                <div class="card-body">

                                    {
                                        cartitems?.length > 0 && cartitems.map((item) => {
                                            return <div class="row">
                                                <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">

                                                    <div class="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/12a.webp"
                                                            class="w-100" alt="Blue Jeans Jacket" />
                                                        <a href="#!">
                                                            <div class="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                                                        </a>
                                                    </div>

                                                </div>

                                                <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">

                                                    <p><strong>Blue denim shirt</strong></p>
                                                    <p>Color: blue</p>
                                                    <p>Size: M</p>
                                                    <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-sm me-1 mb-2" data-mdb-tooltip-init
                                                        title="Remove item">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                    <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-danger btn-sm mb-2" data-mdb-tooltip-init
                                                        title="Move to the wish list">
                                                        <i class="fas fa-heart"></i>
                                                    </button>

                                                </div>

                                                <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">

                                                    <div class="d-flex mb-4" style={{ maxWidth: '300px' }}>
                                                        <button data-mdb-button-init data-mdb-ripple-init class="btn btn-primary px-3 me-2"
                                                            onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                                                            <i class="fas fa-minus"></i>
                                                        </button>

                                                        <div data-mdb-input-init class="form-outline">
                                                            <input id="form1" min="0" name="quantity" value="1" type="number" class="form-control" />
                                                            <label class="form-label" for="form1">Quantity</label>
                                                        </div>

                                                        <button data-mdb-button-init data-mdb-ripple-init class="btn btn-primary px-3 ms-2"
                                                            onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                                                            <i class="fas fa-plus"></i>
                                                        </button>
                                                    </div>



                                                    <p class="text-start text-md-center">
                                                        <strong>$17.99</strong>
                                                    </p>

                                                </div>
                                            </div>

                                        })
                                    }


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cartpage
