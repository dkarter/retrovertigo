---
slug: add-visual-fold-markers-to-vims-gutter
date: 2020-01-06 03:57:48Z
title: "Add visual fold markers to Vim's gutter"
tags: vim
original_link: https://til.hashrocket.com/posts/glglk0lmnl-add-visual-fold-markers-to-vims-gutter
---


TIL that you can display visual fold markers in Vim's gutter by setting the `foldcolumn`!

```vim
set foldcolumn=2
```

The number indicates how wide the gutter holding the fold marks should be.

Here it is in action:

![demo](https://i.imgur.com/wUeDB7O.gif)

This also makes the folds openable via mouse, which may be useful for some folks.

For more info: `:h foldcolumn`
