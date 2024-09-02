import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentList from './StudentList';
import TeacherList from './TeacherList';
import '../styles/Dashboard.css'; // Import the CSS file

const Dashboard = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');

    useEffect(() => {
        console.log('Retrieved role from localStorage:', role); // Debug log
    
        if (!role) {
            console.log('No role found, redirecting to register'); // Debug log
            navigate('/register');
        }
    }, [role, navigate]);

    const handleCreateStudent = () => {
        navigate('/addstudent');
    };

    const handleCreateTeacher = () => {
        navigate('/addteacher');
    };

    if (!role) {
        return null; // Prevent rendering if there's no role
    }

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            {role === 'student' && (
                <div className="dashboard-section">
                    <h2>Student Dashboard</h2>
                    <div className="student-list">
                        <StudentList />
                    </div>
                    <button onClick={handleCreateStudent}>Create Student</button>
                </div>
            )}
            {role === 'teacher' && (
                <div className="dashboard-section">
                    <h2>Teacher Dashboard</h2>
                    <div className="teacher-list">
                        <TeacherList />
                    </div>
                    <button onClick={handleCreateTeacher}>Create Teacher</button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
