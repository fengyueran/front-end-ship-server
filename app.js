import express from "express";
import bodyParser from "body-parser";
import lowdb from "lowdb";
import FileAsync from "lowdb/adapters/FileAsync";
import path from "path";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const adapter = new FileAsync("db/db.json");
lowdb(adapter)
  .then((db) => {
    app.get("/questions/all", (req, res) => {
      const questionsId = db.get("questionsId").value();
      const questionsObj = db.get("questionsObj").value();
      res.send({ questionsId, questionsObj });
    });

    app.get("/question/:id", (req, res) => {
      const id = req.params && req.params.id;
      console.log(id);
      fs.readFile(path.join(`${__dirname}/db/answers/${id}.html`), "utf8", (err, data) => {
        if (err) {
          res.send({ __html: "略" });
        } else {
          res.send({ __html: data });
        }
      });
    });

    // POST /posts
    //  app.post('/posts', (req, res) => {
    //    db.get('posts')
    //      .push(req.body)
    //      .last()
    //      .assign({ id: Date.now().toString() })
    //      .write()
    //      .then(post => res.send(post));
    //  });

    // Set db default values
  })
  .then(() => {
    app.listen(8000, () => console.log("listening on port 8000"));
  });
