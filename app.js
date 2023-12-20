const express = require('express');
const path = require('path');
const multer = require('multer');
const mergePdfs = require('./merge');
const upload = multer({ dest: 'uploads/'});
const app = express();
const port = 3000;

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/templates/index.html')); 
});

app.post('/merge', upload.array('pdfs'), async (req, res, next) => {
  let timestamp = await mergePdfs(req.files);
  res.redirect(`http://localhost:3000/static/${timestamp}.pdf`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});