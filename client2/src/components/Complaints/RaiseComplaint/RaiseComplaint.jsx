import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import { useCookies } from "react-cookie";
import './RaiseComplaint.css';

const NewWaterConnection = () => {

    const [connections, setConnections] = useState([]);
    const [cookies, setCookies] = useCookies(["access_token"]);
    const user = cookies.access_token ? jwtDecode(cookies.access_token) : null;


    useEffect(() => {
        const fetchConnections = async () => {
            try {
            const response = await axios.post('http://localhost:5001/connection/searchuserconnection', {
                name:user.name
            });
            setConnections(response.data);
            // alert(connections)
            } catch (error) {
                console.error('Error fetching connections:', error);
            }
        };
        fetchConnections();
    }, []);


    const [showModal, setShowModal] = useState(true);
    const [formData, setFormData] = useState({
        name: user.name,
        address: '',
        city: '',
        pincode: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            console.log(formData);
            const response = await axios.post("http://localhost:5001/connection/addconnection", formData)

            setShowModal(false)
            alert("Request for new connection successfully sent")
            window.location.reload();

        } catch(error){
            console.error("Error submitting form:", error);
            alert("An unexpected error occurred");
        }
    }

    return (
        <div>
            {/* <button onClick={() => setShowModal(true)}>Request New Water Connection</button> */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}><Link to="/complaint" className='close-icon'>&times;</Link></span>
                        {/* {alert(JSON.stringify(connections))} */}
                        <h2 className="form-title">New Water Connection Request</h2>
                        <form className="connection-form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Username"
                                value={formData.name}
                                readOnly={true}
                                disabled={true}
                                onChange={handleChange}
                                className="input-field"
                            />
                            <input
                                type="address"
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleChange}
                                className="input-field"
                            />
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleChange}
                                className="input-field"
                            />
                            <input
                                type="number"
                                name="pincode"
                                placeholder="Pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                className="input-field"
                            />
                            <button type="submit" className="submit-button">Submit Request</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewWaterConnection;