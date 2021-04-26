---
slug: reverse-sort-lines-in-vim
date: 2018-11-03 01:38:10Z
title: "Reverse sort lines in Vim"
tags: vim
original_link: https://til.hashrocket.com/posts/kxno5ays5l-reverse-sort-lines-in-vim
---


Vim provides `sort` command for ordering lines in an ascending order, but what if you want to sort the lines in a reverse order?

Linux's `tail` to the rescue!

First select the lines to be reversed in visual mode with `V` (big V) then execute this Linux command from Vim's command prompt:

```
:'<,'>!tail -r
```

![demo](https://i.imgur.com/140zFZP.gif)

