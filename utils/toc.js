const cheerio = require("cheerio");
const escape = require("lodash/escape");

function tocHelper(str, options = {}) {
  const $ = cheerio.load(str);
  const { max_depth, list_number } = options;
  const headingsMaxDepth = max_depth || 6;
  const headingsSelector = ["h1", "h2", "h3", "h4", "h5", "h6"]
    .slice(0, headingsMaxDepth)
    .join(",");
  const headings = $(headingsSelector);

  if (!headings.length) return "";

  const className = options.class || "toc";
  const listNumber = list_number || true;
  let result = `<div class="toc-article"><strong class="toc-title">Contents</strong><ol class="${className}">`;
  const lastNumber = [0, 0, 0, 0, 0, 0];
  let firstLevel = 0;
  let lastLevel = 0;
  let i = 0;

  headings.each(function () {
    const level = +this.name[1];
    const id = $(this).attr("id");
    const text = escape($(this).text());

    lastNumber[level - 1]++;

    for (i = level; i <= 5; i++) {
      lastNumber[i] = 0;
    }

    if (firstLevel) {
      for (i = level; i < lastLevel; i++) {
        result += "</li></ol>";
      }

      if (level > lastLevel) {
        result += `<ol class="${className}-child">`;
      } else {
        result += "</li>";
      }
    } else {
      firstLevel = level;
    }

    result += `<li class="${className}-item ${className}-level-${level}">`;
    result += `<a class="${className}-link" href="#${id}">`;

    if (listNumber) {
      result += `<span class="${className}-number">`;

      for (i = firstLevel - 1; i < level; i++) {
        result += `${lastNumber[i]}.`;
      }

      result += "</span> ";
    }

    result += `<span class="${className}-text">${text}</span></a>`;

    lastLevel = level;
  });

  for (i = firstLevel - 1; i < lastLevel; i++) {
    result += "</li></ol></div>";
  }

  return result;
}

module.exports = tocHelper;
