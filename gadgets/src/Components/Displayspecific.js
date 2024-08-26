import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
const Displayspecific = () => {

    const specificproduct = useSelector(state => state.specificproducts)
    console.log("specific product", specificproduct);

    const { state } = useLocation()
    console.log(state);


    return (
        <>
            <div className="row">
                {specificproduct?.length > 0 && specificproduct.filter((product) => product.category === state.key).map((product) => (
                    <div key={product.id}>
                        <section style={{ backgroundColor: '#eee' }}>
                            <div class="container py-5">
                                <div class="row justify-content-center">
                                    <div class="col-md-12 col-xl-10">
                                        <div class="card shadow-0 border rounded-3">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                                        <div class="bg-image hover-zoom ripple rounded ripple-surface">
                                                            <img src={product.image}
                                                                class="w-100" />
                                                            <a href="#!">
                                                                <div class="hover-overlay">
                                                                    <div class="mask" style={{ backgroundColor: 'rgba(253, 253, 253, 0.15)' }}></div>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-lg-6 col-xl-6">
                                                        <h5>{product.name}</h5>
                                                        <p class="text-truncate mb-4 mb-md-0">
                                                            {product.description}
                                                        </p>

                                                        <div class="mt-1 mb-0 text-muted small">
                                                            <span>100% cotton</span>
                                                            <span class="text-primary"> • </span>
                                                            <span>Light weight</span>
                                                            <span class="text-primary"> • </span>
                                                            <span>Best finish<br /></span>
                                                        </div>
                                                        <div class="mb-2 text-muted small">
                                                            <span>Unique design</span>
                                                            <span class="text-primary"> • </span>
                                                            <span>For men</span>
                                                            <span class="text-primary"> • </span>
                                                            <span>Casual<br /></span>
                                                        </div>

                                                    </div>
                                                    <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                                        <div class="d-flex flex-row align-items-center mb-1">
                                                            <h4 class="mb-1 me-1">Rs.{product.price}</h4>
                                                        </div>
                                                        <h6 class="text-success">Free shipping</h6>
                                                        <div class="d-flex flex-column mt-4">
                                                            <button data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-sm" type="button">Details</button>
                                                            <button data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-primary btn-sm mt-2" type="button">
                                                                Add to wishlist
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
    )
}

export default Displayspecific
