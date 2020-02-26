import forEach from "lodash/forEach";
import {
  walkSource,
  getArticles,
  generateBlogs,
  getArticleNum
} from "./helper";

const startGenerate = () => {
  const baseDir = `./source/blogs`;
  const files = walkSource(baseDir);
  files.sort((a, b) => getArticleNum(a) - getArticleNum(b));
  const articles = getArticles(files);
  const blogs = generateBlogs(articles);
  forEach(blogs, ({ title }) => {
    console.log(`Generated: ${title}.html`);
  });
  console.log(`${blogs.length} files generated`);
};

startGenerate();
