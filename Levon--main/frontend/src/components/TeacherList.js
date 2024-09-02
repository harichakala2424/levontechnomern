import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/TeacherList.css'; // Import the CSS file

const TeacherList = () => {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/teachers', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTeachers(response.data);
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };

        fetchTeachers();
    }, []);

    return (
        <div className="teacher-list-container">
            <h2>Teacher List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Subject</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map(teacher => (
                        <tr key={teacher.teacher_id}>
                            <td>{teacher.teacher_id}</td>
                            <td>{teacher.name}</td>
                            <td>{teacher.subject}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeacherList;
