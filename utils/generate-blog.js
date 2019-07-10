import forEach from "lodash/forEach";
import { walkSource, getArticles, generateBlogs } from "./helper";

const startGenerate = () => {
  const baseDir = `./source/blogs`;
  const files = walkSource(baseDir);
  const articles = getArticles(files);
  const blogs = generateBlogs(articles);
  forEach(blogs, ({ title }) => {
    console.log(`Generated: ${title}.html`);
  });
  console.log(`${blogs.length} files generated`);
};

startGenerate();
