import "@babel/polyfill";
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

const readFile = file => new Promise((resolve) => {
  fs.readFile(file, "utf8", (e, data) => {
    if (e) {
      console.log(e);
      resolve(null);
    }
    resolve(data);
  });
});

const handleHtmlRequest = async (req, res, type) => {
  const id = req.params && req.params.id;
  const filePath = path.join(`${__dirname}/db/${type}/${id}.html`);
  const data = await readFile(filePath);
  if (data) {
    res.send({ __html: data });
  } else {
    res.send({ __html: "" });
  }
};

const adapter = new FileAsync("db/db.json");

lowdb(adapter)
  .then((db) => {
    app.get("/dzdp/authority/:phone", async (req, res) => {
      const phone = req.params && req.params.phone;
      const dzdpWhitelist = db.get("dzdpWhitelist").value();
      const hasAuthority = dzdpWhitelist.indexOf(phone) >= 0;
      res.send(hasAuthority);
    });

    app.get("/questions/all", (req, res) => {
      const questions = db.get("questions").value();
      const record = db.get("record").value();
      res.send({ questions, record });
    });

    app.get("/blogs/all", (req, res) => {
      const blogs = db.get("blogs").value();
      res.send(blogs);
    });

    app.get("/blog/:id", async (req, res) => {
      handleHtmlRequest(req, res, "blogs");
    });

    app.get("/question/:id", async (req, res) => {
      handleHtmlRequest(req, res, "questions");
    });

    app.get("/answer/:id", async (req, res) => {
      handleHtmlRequest(req, res, "answers");
    });

    app.get("/websites/all", (req, res) => {
      const websites = db.get("websites").value();
      res.send(websites);
    });

    app.post("/questiondone/:id", async (req, res) => {
      const id = req.params && req.params.id;
      if (id) {
        const record = db.get("record").value();
        const finished = record.finished || [];
        const index = finished.indexOf(id);
        if (index < 0) {
          finished.push(id);
          record.finished = finished;
          db.set("record", record).write();
        }
      }
      res.sendStatus(200);
    });
  })
  .then(() => {
    app.listen(8000, () => console.log("listening on port 8000"));
  });
