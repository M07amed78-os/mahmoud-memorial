const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// هنا لازم نستخدم بورت Render أو 3000 محلي
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files (HTML/CSS/JS) from the 'public' folder
app.use(express.static('public'));

// Initialize SQLite database
const db = new sqlite3.Database('./counters.db', (err) => {
  if (err) console.error(err.message);
  else console.log('Connected to SQLite database.');
});

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS counters (
  id TEXT PRIMARY KEY,
  count INTEGER
)`);

// ==========================
//   API ENDPOINTS
// ==========================

// Get all counters
app.get('/counters', (req, res) => {
  db.all("SELECT * FROM counters", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const result = {};
    rows.forEach(r => result[r.id] = r.count);
    res.json(result);
  });
});

// Increment a counter
app.post('/increment', (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'id required' });
  db.run(
    `INSERT INTO counters(id, count) VALUES(?, 1)
     ON CONFLICT(id) DO UPDATE SET count = count + 1`,
    [id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

// Reset a counter (optional)
app.post('/reset', (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'id required' });
  db.run("UPDATE counters SET count=0 WHERE id=?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// ==========================
//   OPTIONAL: Provide adhkar list
// ==========================
const morningAdhkar = [
  "أصبحنا وأصبح الملك لله...",
  "رضيت بالله ربًا وبالإسلام دينًا...",
];
const eveningAdhkar = [
  "أمسينا وأمسى الملك لله...",
  "اللهم بك أمسينا وبك نحيا...",
];

app.get('/adhkar', (req, res) => {
  res.json({
    morning: morningAdhkar,
    evening: eveningAdhkar
  });
});

// ==========================
//   START SERVER
// ==========================
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);