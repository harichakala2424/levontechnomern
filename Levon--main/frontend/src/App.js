import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import TeacherList from './components/TeacherList';
import Login from './components/Login';
import AddStudent from './components/AddStudent'
import Register from './components/Register';
import AddTeacher from './components/AddTeacher'
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path='/' element={<Login/>}/>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/students" element={<StudentList />} />
                <Route path="/teachers" element={<TeacherList />} />
                <Route path='/addstudent' element={<AddStudent/>}/>
                <Route path='/addteacher' element={<AddTeacher/>}/>
            </Routes>
        </Router>
    );
};

export default App;
