---
slug: pretty-print-json-in-neovimvim-using-jq
date: 2019-08-23 19:55:39Z
title: "Pretty-Print JSON in NeoVim/Vim using jq"
tags: vim
canonical: https://til.hashrocket.com/posts/uvsd8l7zes-pretty-print-json-in-neovimvim-using-jq
---


[I've written here before about how to pretty-print JSON in Vim](https://til.hashrocket.com/posts/5b4ce2484e-pretty-print-jsonhtml-in-vim) but since then I have found an even easier method using `jq`.

[jq](https://github.com/stedolan/jq) is an amazing command line utility for processing, querying and formatting JSON. I use it all the time when I get a response from an API request and I want to extract information or simply to pretty-print it with colors. All you have to do is pipe the `curl` results into `jq`:

```bash
curl https://til.hashrocket.com/api/developer_posts.json?username=doriankarter | jq
```

![image](https://i.imgur.com/9xqeccN.png)

You can also use `jq` inside of NeoVim to pretty print a JSON string, right in your buffer using this command:

```
:%!jq
```

![demo](https://i.imgur.com/DrdAbWV.gif)
