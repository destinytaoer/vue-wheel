const express = require('express');
const multer = require('multer');
const cors = require('cors');
const upload = multer({ dest: 'uploads/' });

const app = express();
const port = 3000;

// 多文件上传
// app.post('/upload', cors(), upload.array('files', 12), (req, res) => {
//   res.send(req.files.map(file => file.filename));
// });
// 单文件上传
app.post('/upload', cors(), upload.single('file'), (req, res) => {
  let filename = req.file.filename;
  let object = { id: filename };
  res.send(object);
});

app.get('/preview/:key', cors(), (req, res) => {
  res.sendFile(
    `uploads/${req.params.key}`,
    {
      root: __dirname,
      headers: {
        'Content-Type': 'image/jpeg'
      }
    },
    error => {
      console.log('error', error);
    }
  );
});

app.listen(port);
