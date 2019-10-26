import fs from "fs";
import marked from "marked";
import yml from "js-yaml";
import lowdb from "lowdb";
import md5 from "spark-md5";
import find from "lodash/find";
import FileSync from "lowdb/adapters/FileSync";
import Walker from "@xinghunm/walk-dir";

const tocHelper = require("./toc");

const questionSchema = {
  id: "",
  title: "",
  exerciseTimes: 0,
  passRate: "--",
  md5: "",
  tags: [],
  type: ""
};

const blogSchema = {
  id: "",
  title: "",
  date: "",
  md5: "",
  tags: [],
  category: []
};

const SCHEMA = {
  questions: questionSchema,
  blogs: blogSchema
};

const walkSource = path => {
  const walker = new Walker();
  walker.workSync(path);
  const files = walker.getFilesPath();
  return files;
};

const getArticleInfo = articleStr => {
  const parts = articleStr.split("---");
  let info;
  try {
    if (parts && parts.length >= 3) {
      if (parts.length === 3) {
        const head = parts[1];
        const headInfo = yml.safeLoad(head);
        const content = parts[2];
        info = { headInfo, content };
      } else if (parts.length === 4) {
        const head = parts[1];
        const headInfo = yml.safeLoad(head);
        const questionDetail = parts[2];
        const content = parts[3];
        info = { headInfo, content, questionDetail };
      }
    }
  } catch (e) {
    throw e;
  }
  return info;
};

const getArticles = files => {
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

const updateStateCreator = (db, type) => article => {
  const { headInfo, content, questionDetail } = article;
  const schema = SCHEMA[type];
  let info = { ...schema, ...headInfo };
  const data = db.get(type).value();
  const byId = data.byId || {};
  const allIds = data.allIds || [];
  const found = find(byId, ({ title }) => title === headInfo.title);
  const hash = md5.hash(`${content}${questionDetail}`);
  if (found) {
    if (hash !== found.md5) {
      info = { ...found, ...headInfo, md5: hash };
      byId[info.id] = info;
    } else {
      info = null;
    }
  } else {
    info.id = md5.hash(headInfo.title);
    info.md5 = hash;
    allIds.push(info.id);
    byId[info.id] = info;
  }
  db.set(type, { allIds, byId }).write();
  return info;
};

const generateQuestions = articles => {
  try {
    const adapter = new FileSync("db/db.json");
    const db = lowdb(adapter);
    const updateQustion = updateStateCreator(db, "questions");
    const qustionsDir = "./db/questions";
    const answersDir = "./db/answers";
    const qustions = [];

    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      const questionInfo = updateQustion(article);
      if (questionInfo) {
        const { content, questionDetail } = article;
        const html = marked(content);
        const fileName = `${answersDir}/${questionInfo.id}.html`;
        fs.writeFileSync(fileName, html, "utf8");
        if (questionDetail) {
          const questionDetailHtml = marked(questionDetail);
          const questionName = `${qustionsDir}/${questionInfo.id}.html`;
          fs.writeFileSync(questionName, questionDetailHtml, "utf8");
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

const generateBlogs = articles => {
  try {
    const adapter = new FileSync("db/db.json");
    const db = lowdb(adapter);
    const updateBlog = updateStateCreator(db, "blogs");
    const blogsDir = "./db/blogs";
    const blogs = [];

    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      const blogInfo = updateBlog(article);
      if (blogInfo) {
        const { content } = article;
        const html = marked(content);
        const toc = tocHelper(html);
        const htmlWithToc = toc + html;
        const fileName = `${blogsDir}/${blogInfo.id}.html`;
        fs.writeFileSync(fileName, htmlWithToc, "utf8");

        blogs.push(blogInfo);
      }
    }
    return blogs;
  } catch (e) {
    console.log("generateQuestions error", e);
    throw e;
  }
};

export { walkSource, getArticles, generateQuestions, generateBlogs };
