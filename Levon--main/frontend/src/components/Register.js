import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css'; // Import the CSS file

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!role) {
            alert('Please select a valid role');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', { username, password, role });
            alert('User registered successfully');

            // Store the role in localStorage
            localStorage.setItem('role', role);

            navigate('/dashboard');
        } catch (error) {
            console.error('Error registering user:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>Username: 
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </label>
                <label>Password: 
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </label>
                <label>Role:
                    <select 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)} 
                        required
                    >
                        <option value="" disabled>Select Role</option>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                    </select>
                </label>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
