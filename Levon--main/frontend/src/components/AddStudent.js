import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AddStudent.css'; // Import the CSS file

const AddStudent = () => {
    const [name, setName] = useState('');
    const [grade, setGrade] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/students', 
                { name, grade, user_id: userId }
            );

            if (response.status === 201) {
                alert('Student added successfully');
                navigate('/dashboard');
            } else {
                alert('Failed to add student');
            }
        } catch (error) {
            console.error('Error adding student:', error);
            alert('Error adding student');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} /></label>
            <label>Grade: <input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} /></label>
            <label>User ID: <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} /></label>
            <button type="submit">Add Student</button>
        </form>
    );
};

export default AddStudent;
