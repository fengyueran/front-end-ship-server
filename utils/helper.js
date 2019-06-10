import fs from "fs";
import marked from "marked";
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
  const parts = articleStr.split("---");
  let info;
  try {
    if (parts && parts.length >= 3) {
      if (parts.length === 3) {
        const head = parts[1];
        const headInfo = yml.safeLoad(head);
        const answer = parts[2];
        info = { headInfo, answer };
      } else if (parts.length === 4) {
        const head = parts[1];
        const headInfo = yml.safeLoad(head);
        const questionDetail = parts[2];
        const answer = parts[3];
        info = { headInfo, answer, questionDetail };
      }
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

const updateQustionCreator = db => (article) => {
  const { headInfo, answer } = article;
  let questionInfo = { ...qustionSchema, ...headInfo };
  const questions = db.get("questions").value();
  const byId = questions.byId || {};
  const allIds = questions.allIds || [];
  const found = find(byId, ({ title }) => title === headInfo.title);
  const hash = md5.hash(answer);
  if (found) {
    if (hash !== found.md5) {
      questionInfo = { ...found, ...headInfo, md5: hash };
      byId[questionInfo.id] = questionInfo;
    } else {
      questionInfo = null;
    }
  } else {
    questionInfo.id = md5.hash(headInfo.title);
    questionInfo.md5 = hash;
    allIds.push(questionInfo.id);
    byId[questionInfo.id] = questionInfo;
  }
  db.set("questions", { allIds, byId }).write();
  return questionInfo;
};

const generateQuestions = (articles) => {
  try {
    const adapter = new FileSync("db/db.json");
    const db = lowdb(adapter);
    const updateQustion = updateQustionCreator(db);
    const qustionsDir = "./db/questions";
    const answersDir = "./db/answers";
    const qustions = [];

    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      const questionInfo = updateQustion(article);
      if (questionInfo) {
        const { answer, questionDetail } = article;
        const html = marked(answer);
        const fileName = `${answersDir}/${questionInfo.id}.html`;
        fs.writeFileSync(fileName, html, "utf8");
        if (questionDetail) {
          const questionName = `${qustionsDir}/${questionInfo.id}.html`;
          fs.writeFileSync(questionName, html, "utf8");
        }
        qustions.push(questionInfo);
      }
    }
    return qustions;
  } catch (e) {
    console.log("generateQuestions error", e);
    throw e;
  }
};

export { walkSource, getArticles, generateQuestions };
