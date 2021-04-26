---
slug: treat-words-with-dash-as-a-word-in-vim
date: 2017-12-26 17:22:57Z
title: "Treat words with dash as a word in Vim"
tags: vim
canonical: https://til.hashrocket.com/posts/t8osyzywau-treat-words-with-dash-as-a-word-in-vim
---


By default vim treats two words connected with an underscore e.g. `search_tag` as a vim word text-object.

This is very useful because you can then use motions and commands on them such as `daw` to delete a word, or `ciw` to change inside the word.

That is not the case for dash separated words e.g. `search-tag`. These types of words are very common in CSS class names and HTML IDs.

To make vim treat dash separated words as a word text-object simply add the following to your `.vimrc`:

```vim
set iskeyword+=-
```

And source it again.
