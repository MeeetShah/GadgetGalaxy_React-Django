import axios from 'axios'
import React, { useState } from 'react'
import { apis } from '../api';
import { Navigate, useNavigate } from 'react-router-dom';


const Customerdetails = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        pincode: '',
        mobile_number: '',
        address: '',
        city: '',
        state: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(apis.Customerdetails, formData);
            alert('User created successfully!');
            console.log('User created:', response.data);
        } catch (error) {
            console.error('Error creating user:', error.response.data);
            alert('Error creating user. Please check your inputs.');
        }
    };

    const gotocard = ()=>{
        navigate('/card')
    }
    return (
        <>
            <div className="form-container">
                <h2>Enter Your Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Pincode</label>
                        <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Mobile Number</label>
                        <input type="text" name="mobile_number" value={formData.mobile_number} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>State</label>
                        <input type="text" name="state" value={formData.state} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="submit-button" onClick={gotocard}>Submit</button>
                </form>
            </div>
        </>
    )
}

export default Customerdetails;
