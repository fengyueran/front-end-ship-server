import express from "express";
import bodyParser from "body-parser";
import lowdb from "lowdb";
import FileAsync from "lowdb/adapters/FileAsync";
import path from "path";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(express.static(path.join(__dirname, "db")));
app.use("websites/thumbnails", express.static(path.join(__dirname, "db/websites/thumbnails")));
app.use(cors());
app.use(bodyParser.json());

const adapter = new FileAsync("db/db.json");
lowdb(adapter)
  .then((db) => {
    app.get("/questions/all", (req, res) => {
      const questions = db.get("questions").value();
      res.send(questions);
    });

    app.get("/question/:id", (req, res) => {
      const id = req.params && req.params.id;
      fs.readFile(path.join(`${__dirname}/db/answers/${id}.html`), "utf8", (err, data) => {
        if (err) {
          res.send({ __html: "略" });
        } else {
          res.send({ __html: data });
        }
      });
    });

    app.get("/websites/all", (req, res) => {
      const websites = db.get("websites").value();
      res.send(websites);
    });
  })
  .then(() => {
    app.listen(8000, () => console.log("listening on port 8000"));
  });
