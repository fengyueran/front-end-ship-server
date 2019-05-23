import forEach from "lodash/forEach";
import { walkSource, getArticles, generateHtmls } from "./helper";

const startGenerate = () => {
  const baseDir = `./source/questions`;
  const dist = "./db/answers";
  const files = walkSource(baseDir);
  const articles = getArticles(files);
  const qustions = generateHtmls(dist, articles);
  forEach(qustions, ({ title }) => {
    console.log(`Generated: ${dist}/${title}.html`);
  });
  console.log(`${qustions.length} files generated`);
};

startGenerate();
