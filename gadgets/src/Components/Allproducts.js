
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apis } from '../api';
import { specificproduct } from '../features/products';
import Displayspecific from './Displayspecific';



const Allproducts = () => {
    const products = useSelector(state => state.products); // Access products from the Redux store
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch products from the Django backend
        axios.get(apis.specificproductapi)
            .then(response => {
                console.log("presenting...");
                console.log(response.data);
                dispatch(specificproduct(response.data));//storing all data to the store

            })
            .catch(error => {
                setError(error.message); // Handle error if the request fails
            });
    }, []); // Empty dependency array means this effect runs once after the initial render


    const gotoitem = (id) => {
        navigate("/specificproduct", { state: { key: id } })
    }


    return (
        <div className="row">
            {products?.length > 0 && products.map((product) => (
                <div key={product.id} className="col-md-3">
                    <div className="card mt-5" style={{ 'width': '18rem' }}>
                        <img src={product.image} style={{ 'height': '15rem' }} className="card-img-top" alt="Hello" />
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">{product.description}</p>
                            <button className="btn btn-primary" onClick={() => gotoitem(product.id)}>Go To Products</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Allproducts;
