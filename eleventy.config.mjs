import { readdir, copyFile } from 'node:fs/promises';
import path from 'node:path';

import EleventyVitePlugin from '@11ty/eleventy-plugin-vite';
import readingTime from 'eleventy-plugin-reading-time';
import pluginRss from '@11ty/eleventy-plugin-rss';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import htmlmin from 'html-minifier-terser';
import { DateTime } from 'luxon';

import markdownIt from './config/markdown-it.mjs';

const isProd = process.env.ELEVENTY_ENV === 'production';

// Vite's MPA build only emits HTML plus the JS/CSS it bundles, so the non-HTML
// templates Eleventy generates (feed.xml, sitemap.xml, robots.txt) would be
// dropped. This inline Vite plugin copies any root-level .xml/.txt files from
// the build root into the output once the bundle is written. It runs inside
// the Vite build (while the temp root still exists), avoiding the race that an
// `eleventy.after` handler would have with the plugin's own build step.
function copyEleventyExtras() {
  let resolvedConfig;
  return {
    name: 'eleventy-copy-extras',
    configResolved(config) {
      resolvedConfig = config;
    },
    async closeBundle() {
      const { root, build } = resolvedConfig;
      const entries = await readdir(root, { withFileTypes: true });
      await Promise.all(
        entries
          .filter((entry) => entry.isFile() && /\.(xml|txt)$/.test(entry.name))
          .map((entry) =>
            copyFile(
              path.join(root, entry.name),
              path.join(build.outDir, entry.name)
            )
          )
      );
    },
  };
}

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      // Static files that must keep stable, un-hashed URLs (images, the CV)
      // live in `static/`. Vite copies its contents verbatim to the output
      // root and leaves `/images/...`-style references untouched.
      publicDir: 'static',
      plugins: [copyEleventyExtras()],
    },
  });

  eleventyConfig.addPlugin(readingTime);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);


  eleventyConfig.setLibrary('md', markdownIt);

  // setup mermaid markdown highlighter
  const highlighter = eleventyConfig.markdownHighlighter;
  eleventyConfig.addMarkdownHighlighter((str, language) => {
    if (language === 'mermaid') {
      return `<pre class="mermaid">${str}</pre>`;
    }
    return highlighter(str, language);
  });

  eleventyConfig.setDataDeepMerge(true);
  // main.css / main.js are bundled + content-hashed by Vite out of the build
  // output, so the source files just need to land on disk for Vite to find.
  eleventyConfig.addPassthroughCopy({ 'src/css': 'css' });
  eleventyConfig.addPassthroughCopy({ 'src/js': 'js' });

  eleventyConfig.addFilter('excerpt', (post) => {
    const content = post.replace(/(<([^>]+)>)/gi, '');
    return content.substr(0, content.lastIndexOf(' ', 200)) + '...';
  });

  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
      'dd LLL yyyy'
    );
  });

  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  });

  eleventyConfig.addFilter('dateToIso', (dateString) => {
    return new Date(dateString).toISOString();
  });

  eleventyConfig.addFilter('head', (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addCollection('tagList', function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach(function (item) {
      if ('tags' in item.data) {
        let tags = item.data.tags;

        tags = tags.filter(function (item) {
          switch (item) {
            case 'all':
            case 'nav':
            case 'post':
            case 'posts':
              return false;
          }

          return true;
        });

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });

    return [...tagSet];
  });

  eleventyConfig.addFilter('pageTags', (tags) => {
    const generalTags = ['all', 'nav', 'post', 'posts'];

    return tags
      .toString()
      .split(',')
      .filter((tag) => {
        return !generalTags.includes(tag);
      });
  });

  eleventyConfig.addTransform('htmlmin', async function (content, outputPath) {
    if (outputPath && outputPath.endsWith('.html') && isProd) {
      return await htmlmin.minify(content, {
        removeComments: true,
        collapseWhitespace: true,
        useShortDoctype: true,
      });
    }

    return content;
  });

  return {
    dir: {
      input: 'src',
      output: 'public',
      includes: 'includes',
      data: 'data',
      layouts: 'layouts'
    },
    passthroughFileCopy: true,
    templateFormats: ['html', 'njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
}
