const express = require('express');
const router = express.Router();
const db = require('../database');

// Get all students
router.get('/', (req, res) => {
  db.all('SELECT * FROM Students', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


router.post('/', (req, res) => {
  const { name, grade, user_id } = req.body;

  db.run(`INSERT INTO Students (name, grade, user_id) VALUES (?, ?, ?)`,
    [name, grade, user_id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ student_id: this.lastID });
    });
});

// Delete a student
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM Students WHERE student_id = ?', id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
