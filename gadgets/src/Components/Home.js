import React, { useEffect, useState } from 'react'
import Allproducts from './Allproducts'
import axios from 'axios'
import { apis } from '../api'
import { useDispatch } from 'react-redux'
import { storeProducts } from '../features/products'

const Home = () => {


    const [error, setError] = useState(null);
    const dispatch = useDispatch();


    useEffect(() => {
        // Fetch products from the Django backend
        axios.get(apis.allproductapi)
            .then(response => {
                dispatch(storeProducts(response.data));//storing all data to the store
            })
            .catch(error => {
                setError(error.message); // Handle error if the request fails
            });
    }, []); // Empty dependency array means this effect runs once after the initial render

    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <div className='container'>
                <h1>Product List</h1>
                <Allproducts /> {/* No props needed here */}
            </div>


        </>
    )
}
export default Home

