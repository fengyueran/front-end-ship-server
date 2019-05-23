import fs from "fs";
import v4 from "uuid/v4";
import showdown from "showdown";
import yml from "js-yaml";
import lowdb from "lowdb";
import md5 from "spark-md5";
import find from "lodash/find";
import FileSync from "lowdb/adapters/FileSync";
import Walker from "@xinghunm/walk-dir";

const qustionSchema = {
  id: "",
  title: "",
  exerciseTimes: 0,
  passRate: "--",
  md5: "",
  tags: [],
  type: ""
};

const walkSource = (path) => {
  const walker = new Walker();
  walker.workSync(path);
  const files = walker.getFilesPath();
  return files;
};

const getArticleInfo = (articleStr) => {
  const match = articleStr.match(/(---\n[\S\s]*)\n---([\S\s]*)/);
  let info;
  try {
    if (match && match.length >= 3) {
      const head = match[1];
      const headInfo = yml.safeLoad(head);
      const content = match[2];
      info = { headInfo, content };
    }
  } catch (e) {
    throw e;
  }
  return info;
};

const getArticles = (files) => {
  const articles = [];
  try {
    for (let i = 0; i < files.length; i++) {
      const filePath = files[i];
      const articleStr = fs.readFileSync(filePath, "utf8");
      const info = getArticleInfo(articleStr);
      if (info) {
        articles.push(info);
      } else {
        throw new Error(`get article info error: ${filePath}`);
      }
    }
  } catch (e) {
    console.log("getArticles error", e);
    throw e;
  }
  return articles;
};

const updateDBCreator = db => (article) => {
  const { headInfo, content } = article;
  let questionInfo = { ...qustionSchema, ...headInfo };
  const questionsObj = db.get("questionsObj").value();
  const found = find(questionsObj, ({ title }) => title === headInfo.title);
  const hash = md5.hash(content);
  if (found) {
    if (hash !== found.md5) {
      questionInfo = { ...found, ...headInfo, md5: hash };
      questionsObj[questionInfo.id] = questionInfo;
      db.set("questionsObj", questionsObj).write();
    } else {
      questionInfo = null;
    }
  } else {
    questionInfo.id = v4();
    questionInfo.md5 = hash;
    db.get("questionsId")
      .push(questionInfo.id)
      .write();
    questionsObj[questionInfo.id] = questionInfo;
    db.set("questionsObj", questionsObj).write();
  }

  return questionInfo;
};

const generateHtmls = (dist, articles) => {
  try {
    const adapter = new FileSync("db/db.json");
    const db = lowdb(adapter);
    const updateDB = updateDBCreator(db);

    const qustions = [];
    if (!fs.existsSync(dist)) {
      fs.mkdirSync(dist);
    }

    const converter = new showdown.Converter();
    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      const questionInfo = updateDB(article);
      if (questionInfo) {
        const { content } = article;
        const html = converter.makeHtml(content);
        const fileName = `${dist}/${questionInfo.id}.html`;
        fs.writeFileSync(fileName, html, "utf8");
        qustions.push(questionInfo);
      }
    }
    return qustions;
  } catch (e) {
    console.log("generateHtmls error", e);
    throw e;
  }
};

export { walkSource, getArticles, generateHtmls };
