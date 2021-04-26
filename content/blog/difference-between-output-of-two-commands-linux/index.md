---
slug: difference-between-output-of-two-commands-linux
date: 2018-03-10 07:36:14Z
title: "Difference between output of two commands #linux"
tags: command-line
canonicalName: "Hashrocket TIL"
canonicalUrl: https://til.hashrocket.com/posts/capk0je8bo-difference-between-output-of-two-commands-linux
---


Recently I've been playing around with ripgrep (rg) which is a tool similar to Ack and Ag, but faster than both (and written in Rust FWIW).

I noticed that when I ran a command in Ag to list all file names in a directory, and counted the number of files shown, I was getting a different number than the comparable command in ripgrep.

```sh
ag -l -g "" | wc -l
# =>      29
```

```sh
rg -l "" | wc -l
# =>      33
```

This led me to wonder if there is an easy way to view the diff between the output of the two commands.

I know I can save the output into a file and then compare the two files with the builtin `diff` command in linux, however I don't see a reason to write to disk for such a comparison.

This is how you would do that without writing to disk:

```sh
diff <(ag -l -g "") <(rg -l "")
```

The diff printed out by this command is inaccurate, so you will need to add a sort to each command:

```sh
diff <(ag -l -g "" | sort) <(rg -l "" | sort)
```
