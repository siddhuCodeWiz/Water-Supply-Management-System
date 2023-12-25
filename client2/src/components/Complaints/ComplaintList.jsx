import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './complaint.css';
import {jwtDecode} from "jwt-decode";
import { useCookies } from "react-cookie";
const ComplaintsPage = () => {
    const [complaints, setComplaints] = useState([]);
    const [cookies, setCookies] = useCookies(["access_token"]);
    const user = cookies.access_token ? jwtDecode(cookies.access_token) : null;

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                if(user.role=="admin" || user.role=="worker"){
                const response = await axios.get('http://localhost:5001/complaints/getcomplaints');
                setComplaints(response.data);
            }
            else if(user.role=="citizen"){
                const response = await axios.post('http://localhost:5001/complaints/usercomplaint',{
                    "name":user.name
                });
                setComplaints(response.data);
                // alert(JSON.stringify(response.data))
            }
            } catch (error) {
                console.error('Error fetching complaints:', error);
            }
        };
        fetchComplaints();
    }, [user.role]);
    
    
    if(user.role=="admin" || user.role=="worker"){
        return (
            <div className="complaints-container">
                <h1>Complaints Received</h1>
                <div>
                    {Array.isArray(complaints) && complaints.map((complaint, index) => (
                        <div className="complaint" key={index}>
                            <span><strong>Complaint ID: </strong>{complaint._id}</span>
                            <span><strong>User: </strong>{complaint.name}</span>
                            <span><strong>HouseId: </strong>{complaint.houseid}</span>
                            <span><strong>Email: </strong>{complaint.email}</span>
                            <span><strong>Mobile Number: </strong>{complaint.mobile}</span>
                            <span><strong>Subject: </strong>{complaint.subject}</span>
                            <span><strong>Description: </strong>{complaint.description}</span>
                            <span><strong>Problem is resolved?</strong></span>
                            <div className="buttons">
                                <button >Yes</button>
                                <button>No</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    else if(user.role=="citizen"){
        return (
            <div className="complaints-container">
                <h1>Complaints Received</h1>
                <div>
                    {Array.isArray(complaints) && complaints.length>0 ? (
                    
                    complaints.map((complaint, index) => (
                        <div className="complaint" key={index}>
                            <span><strong>Complaint ID: </strong>{complaint._id}</span>
                            <span><strong>User: </strong>{complaint.name}</span>
                            <span><strong>HouseId: </strong>{complaint.houseid}</span>
                            <span><strong>Email: </strong>{complaint.email}</span>
                            <span><strong>Mobile Number: </strong>{complaint.mobile}</span>
                            <span><strong>Subject: </strong>{complaint.subject}</span>
                            <span><strong>Description: </strong>{complaint.description}</span>
                            <span><strong>Status: </strong>{complaint.resolved}</span>
                        </div>
                    ))):

                    (<h3>No complaints received so far</h3>)
                }
                </div>
            </div>
        );
    }
    
};

export default ComplaintsPage;