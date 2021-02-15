const fs = require('fs');
const slugify = require('slug');
const dateFns = require('date-fns');

const title = process.argv[2];
if (!title) {
  throw new Error('a title is required!');
}
const slug = slugify(title.toLowerCase());
const date = dateFns.format(new Date(), 'yyyy-MM-dd');
const dir = `./content/blog/${slug}`;
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
} else {
  throw new Error('That post already exists!');
}

const filename = `${dir}/index.md`;
fs.writeFileSync(
  filename,
  `---
slug: ${slug}
date: ${date}
title: "${title}"
---`,
  (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      return;
    }
    // eslint-disable-next-line no-console
    console.log(`${title} was created!`);
  }
);
