const markdownIt = require('markdown-it');
const markdownItEmoji = require('markdown-it-emoji');

const options = {
  html: true,
  breaks: true,
  linkify: true
};

const configuredMd = markdownIt(options).use(markdownItEmoji);

module.exports = configuredMd;
