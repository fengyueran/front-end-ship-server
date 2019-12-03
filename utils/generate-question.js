import forEach from "lodash/forEach";
import {
  walkSource,
  getArticles,
  generateQuestions,
  getArticleNum
} from "./helper";

const startGenerate = () => {
  const baseDir = `./source/questions`;
  const files = walkSource(baseDir);
  files.sort((a, b) => getArticleNum(a) - getArticleNum(b));
  const articles = getArticles(files);
  const qustions = generateQuestions(articles);
  forEach(qustions, ({ title }) => {
    console.log(`Generated: ${title}.html`);
  });
  console.log(`${qustions.length} files generated`);
};

startGenerate();
