const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

// parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  port: 3309,
  password: '12HJQmbxttw',
  database: 'mahasiswa'
});

db.connect((err) => {
  if (err) {
    console.log('Error connecting to mysql:', err);
    return;
  }
  console.log('Connected to mysql database');
});

/**
 * GET /biodata
 * Returns all biodata rows
 */
app.get('/biodata', (req, res) => {
  const sql = 'SELECT id, nama, alamat, agama FROM biodata';
  db.execute(sql, (err, results) => {
    if (err) {
      console.error('Error fetching biodata:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

/**
 * GET /biodata/:id
 * Returns biodata by id
 */
app.get('/biodata/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });

  const sql = 'SELECT id, nama, alamat, agama FROM biodata WHERE id = ?';
  db.execute(sql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching biodata:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(results[0]);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
