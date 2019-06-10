import forEach from "lodash/forEach";
import { walkSource, getArticles, generateQuestions } from "./helper";

const startGenerate = () => {
  const baseDir = `./source/questions`;
  const files = walkSource(baseDir);
  const articles = getArticles(files);
  const qustions = generateQuestions(articles);
  forEach(qustions, ({ title }) => {
    console.log(`Generated: ${title}.html`);
  });
  console.log(`${qustions.length} files generated`);
};

startGenerate();
