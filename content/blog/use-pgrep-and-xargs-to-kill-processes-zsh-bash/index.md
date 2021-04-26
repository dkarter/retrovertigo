---
slug: use-pgrep-and-xargs-to-kill-processes-zsh-bash
date: 2020-01-21 18:43:14Z
title: "Use pgrep and xargs to kill (processes) #zsh #bash"
tags: command-line
original_link: https://til.hashrocket.com/posts/4k2mpniixg-use-pgrep-and-xargs-to-kill-processes-zsh-bash
---


Have you ever found yourself doing this:

```sh
ps aux | grep [b]eam
```

And then copying the pids one by one so you can pass them to `kill`?

There's a better way to return just the pids of the process you care about and not having to worry about `ps` finding your `grep` call (that's why I'm surrounding the `b` in `beam` with square brackets).

```sh
pgrep -f beam
```

This will return just the pids, one in each line (which is perfect for use with `xargs`)

Example output:

```
11632
11456
```

Use with `xargs` to `kill` (`-9` for extra brutality points 😈):

```sh
pgrep -f beam | kill -9
```
