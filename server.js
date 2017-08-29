const express = require('express');
const path = require('path');
const multer = require('multer');

const upload = multer();
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({size: req.file.size});
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running.');
});
