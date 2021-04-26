---
slug: show-escaped-bash-color-codes-in-less-linux
date: 2018-06-11 14:54:33Z
title: "Show escaped bash color codes in less #linux"
tags: command-line
canonical: https://til.hashrocket.com/posts/mvnhzr654p-show-escaped-bash-color-codes-in-less-linux
---


My ls command colors directories and files according to their type and permissions:

![ls with color](https://i.imgur.com/yvrvekW.gif)

But when the window is too small to fit the content I pipe the result into `less`:

![less broken](https://i.imgur.com/kfs0Mr9.gif)

Which cannot correctly parse the escape code from ls and turn them into color. To fix that add `-r` to the less command:

![solution](https://i.imgur.com/EiPGO4q.gif)


Notes:
> My `l` alias is `gls -F -G --color --group-directories-first -lah` (`gls` is GNU ls)

> You can `alias less=less -r` if you want this to be the default behavior for less.
