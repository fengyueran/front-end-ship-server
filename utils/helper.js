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
  try {
    const matchHeadInfoRes = articleStr.match(/---([\s\S]*?)---([\s\S]*)/m);
    const isMatchedHeadInfo = matchHeadInfoRes && matchHeadInfoRes.length === 3;
    if (isMatchedHeadInfo) {
      const headInfo = yml.safeLoad(matchHeadInfoRes[1]);
      let content = matchHeadInfoRes[2];
      const articleInfo = { headInfo, content };
      const matchQuestionRes = content.match(/([\s\S]*?)---问题([\s\S]*)/m);
      if (matchQuestionRes) {
        articleInfo.questionDetail = matchQuestionRes[1];
        articleInfo.content = matchQuestionRes[2];
      }
      return articleInfo;
    }
    throw new Error("Get article head info error");
  } catch (e) {
    throw e;
  }
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

const getArticleNum = file => {
  const match = file.match(/(\d+)\./);
  if (match) {
    return match[0];
  }
  throw new Error(`The file: ${file} has not number`);
};

export {
  walkSource,
  getArticles,
  generateQuestions,
  generateBlogs,
  getArticleNum
};
