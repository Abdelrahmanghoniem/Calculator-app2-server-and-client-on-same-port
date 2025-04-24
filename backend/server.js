const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Enhanced error handling
process.on('uncaughtException', (err) => {
  console.error('CRITICAL ERROR:', err);
});

// Serve files differently in EXE vs development
const serveFile = (req, res) => {
  const filePath = req.path === '/' ? 'index.html' : req.path;
  const fullPath = path.join(__dirname, 'public', filePath);

  try {
    const content = fs.readFileSync(fullPath, 'utf-8');
    res.send(content);
  } catch (err) {
    res.status(404).send('File not found');
  }
};

if (fs.existsSync(path.join(__dirname, 'snapshot'))) {
  app.get('*', serveFile);
} else {
  app.use(express.static(path.join(__dirname, 'public')));
}

// API endpoint
app.get('/api/calculate', (req, res) => {
  try {
    const { expression } = req.query;
    const result = eval(expression); // Replace with math.js in production
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: 'Invalid expression' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});