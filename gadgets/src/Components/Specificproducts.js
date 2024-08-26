// Extra File
import React from 'react'
import { useEffect, useState } from "react";
import { apis } from "../api";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { specificproduct } from '../features/products';
import Displayspecific from './Displayspecific';


const Specificproducts = () => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch()

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

    return (
        <>
            <div className='container'>
                <Displayspecific /> {/* No props needed here */}
            </div>

        </>

    )
}

export default Specificproducts