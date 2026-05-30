import markdownIt from 'markdown-it';
import { full as markdownItEmoji } from 'markdown-it-emoji';

const options = {
  html: true,
  breaks: true,
  linkify: true
};

const configuredMd = markdownIt(options).use(markdownItEmoji);

export default configuredMd;
