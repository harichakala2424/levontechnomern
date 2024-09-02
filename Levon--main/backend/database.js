const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to SQLite database
const dbPath = path.resolve(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Enable foreign key support
db.run('PRAGMA foreign_keys = ON');

// Create Users table
db.run(`
    CREATE TABLE IF NOT EXISTS Users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        role TEXT
    )
`);

// Create Students table
db.run(`
    CREATE TABLE IF NOT EXISTS Students (
        student_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        grade TEXT,
        user_id INTEGER,
        FOREIGN KEY(user_id) REFERENCES Users(user_id) ON DELETE CASCADE
    )
`);

// Create Teachers table
db.run(`
    CREATE TABLE IF NOT EXISTS Teachers (
        teacher_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        subject TEXT,
        user_id INTEGER,
        FOREIGN KEY(user_id) REFERENCES Users(user_id) ON DELETE CASCADE
    )
`);

module.exports = db;
