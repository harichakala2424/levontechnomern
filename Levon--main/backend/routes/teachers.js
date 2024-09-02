const express = require('express');
const router = express.Router();
const db = require('../database');

// Get all teachers
router.get('/', (req, res) => {
  db.all('SELECT * FROM Teachers', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add a teacher
router.post('/', (req, res) => {
  const { name, subject, user_id } = req.body;

  db.run(`INSERT INTO Teachers (name, subject, user_id) VALUES (?, ?, ?)`,
    [name, subject, user_id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ teacher_id: this.lastID });
    });
});

// Delete a teacher
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM Teachers WHERE teacher_id = ?', id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
