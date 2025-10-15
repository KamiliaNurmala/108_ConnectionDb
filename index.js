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

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
