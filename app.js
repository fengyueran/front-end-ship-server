import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

const app = express();
app.use(cors());

// app.post('/', function (req, res) {
//    res.send('Got a POST request');
// });

app.get('/questions/:id', (req, res) => {
  fs.readFile(path.join(`${__dirname}/about.html`), 'utf8', (err, data) => {
    if (err) {
      res.send({ __html: null });
    } 
    res.send({ __html: data });
  });
});

app.listen(8000, () => {
  console.log('App listening on port 8000.');
});
