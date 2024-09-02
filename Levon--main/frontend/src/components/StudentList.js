import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/StudentList.css'; // Import the CSS file

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null); // Add error state

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No token found');
                    return;
                }

                const response = await axios.get('http://localhost:5000/api/students', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                console.log('Fetched students:', response.data); // Debug log
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
                setError('Error fetching students'); // Set error message
            }
        };

        fetchStudents();
    }, []);

    return (
        <div className="student-list-container">
            <h2>Student List</h2>
            {error && <p className="error-message">{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length > 0 ? (
                        students.map(student => (
                            <tr key={student.student_id}>
                                <td>{student.student_id}</td>
                                <td>{student.name}</td>
                                <td>{student.grade}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No students found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;
