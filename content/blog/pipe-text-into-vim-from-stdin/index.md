---
slug: pipe-text-into-vim-from-stdin
date: 2018-02-18 20:59:38Z
title: "Pipe text into Vim from stdin"
tags: vim
original_link: https://til.hashrocket.com/posts/akcktdrn1t-pipe-text-into-vim-from-stdin
---


You can pipe text into vim directly from stdin. This can be helpful if you want to edit the output of a long bash command, or if you want to see what an installation script contains before piping it into bash.


```sh
curl -fsSL https://raw.github.com/cknadler/vim-anywhere/master/install | vim -
```

The key is to use the `-` after the `vim` command to make it read from stdin. This will open a new buffer with the output of the previous command.
