const  express  = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',     // Replace with your MySQL host
  user: 'root',          // Replace with your MySQL username
  password: '',  // Replace with your MySQL password
  database: 'contact_db' // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// API endpoint to insert contact form data
app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;

  // Insert data into the database
  const query = 'INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, phone, message], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error saving contact');
      return;
    }
    res.status(200).send('Contact saved successfully');
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});