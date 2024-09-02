const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

// User registration
app.post('/api/users/register', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Check if username already exists
        db.get('SELECT username FROM Users WHERE username = ?', [username], (err, row) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            if (row) {
                return res.status(400).json({ alert: 'Username already exists' });
            } else {
                // Proceed with inserting the new user
                db.run('INSERT INTO Users (username, password, role) VALUES (?, ?, ?)', 
                [username, hashedPassword, role], function (err) {
                    if (err) {
                        console.error('Error registering user:', err);
                        return res.status(500).json({ error: 'Error registering user' });
                    }
                    res.status(201).json({ message: 'User registered successfully' });
                });
            }
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
});

// User login
app.post('/api/users/login', (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM Users WHERE username = ?', [username], async (err, user) => {
        if (err || !user) return res.status(400).json({ error: 'Invalid credentials' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ user_id: user.user_id, role: user.role }, 'secretkey', { expiresIn: '1h' });
        res.json({ token });
    });
});

// CRUD for Students
app.post('/api/students', (req, res) => {
    const { name, grade, user_id } = req.body;
    db.run('INSERT INTO Students (name, grade, user_id) VALUES (?, ?, ?)', [name, grade, user_id], function (err) {
        if (err) {
            console.error('SQLite error:', err);
            return res.status(500).json({ error: 'Error adding student' });
        }
        res.status(201).json({ message: 'Student added successfully' });
    });
});

app.get('/api/students', (req, res) => {
    db.all('SELECT * FROM Students', [], (err, rows) => {
        if (err) {
            console.error('SQLite error:', err);
            return res.status(500).json({ error: 'Error fetching students' });
        }
        res.json(rows);
    });
});

// CRUD for Teachers
app.post('/api/teachers', (req, res) => {
    const { name, subject, user_id } = req.body;
    db.run('INSERT INTO Teachers (name, subject, user_id) VALUES (?, ?, ?)', [name, subject, user_id], function (err) {
        if (err) {
            console.error('SQLite error:', err);
            return res.status(500).json({ error: 'Error adding teacher' });
        }
        res.status(201).json({ message: 'Teacher added successfully' });
    });
});

app.get('/api/teachers', (req, res) => {
    db.all('SELECT * FROM Teachers', [], (err, rows) => {
        if (err) {
            console.error('SQLite error:', err);
            return res.status(500).json({ error: 'Error fetching teachers' });
        }
        res.json(rows);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
