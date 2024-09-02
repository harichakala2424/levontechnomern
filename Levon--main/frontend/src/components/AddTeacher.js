import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddTeacher.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
const AddTeacher = () => {
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [userId, setUserId] = useState('');
    const navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/teachers', { name, subject, user_id: userId }, {
                headers: { Authorization: token }
            });
            alert('Teacher added successfully');
            navigate('/dashboard')
        } catch (error) {
            console.error('Error adding teacher:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} /></label>
            <label>Subject: <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} /></label>
            <label>User ID: <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} /></label>
            <button type="submit">Add Teacher</button>
        </form>
    );
};

export default AddTeacher;
