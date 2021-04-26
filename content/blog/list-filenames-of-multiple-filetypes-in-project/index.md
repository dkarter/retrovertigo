---
slug: list-filenames-of-multiple-filetypes-in-project
date: 2017-11-14 16:59:06Z
title: "List filenames of multiple filetypes in project"
tags: command-line
original_link: https://til.hashrocket.com/posts/kxvmdlrzh2-list-filenames-of-multiple-filetypes-in-project
---


Ag (aka [The Silver Searcher](https://github.com/ggreer/the_silver_searcher)) is an amazing piece of software. It allows you to define file types (like Ack) and comes prepackeged with some file types.

Using this feature you can list all files of a specific type in your project. For example say we want to list all Ruby and JavaScript files:

```bash
ag --ruby --js -l
```

Ag has the added benefit over Ack, that it ignores gitignored files, so you only get the files that matter (and not stuff from node_modules etc).

To see what filetypes Ag supports:

```bash
ag --list-file-types
```

The list is pretty extensive! Unlike Ack however, there is currently no way to add new file types or extend the list.

