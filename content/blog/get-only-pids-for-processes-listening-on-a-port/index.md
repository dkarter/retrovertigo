---
slug: get-only-pids-for-processes-listening-on-a-port
date: 2018-09-27 16:47:47Z
title: "Get ONLY PIDs for processes listening on a port"
tags: command-line
original_link: https://til.hashrocket.com/posts/agbrbajdwh-get-only-pids-for-processes-listening-on-a-port
---


The lsof utility on Linux is useful among other things for checking which process is listening on a specific port.

If you need to kill all processes listening on a particular port, normally you would reach for something like `awk '{ print $2 }'`, but that would fail to remove the `PID` column header, so you would also need to pipe through `tail -1`. It get pretty verbose for something that should be pretty simple.

Fortunatly, lsof provides a way to list all the pids without the `PID` header specifically so you can pipe the output to the `kill` command.

The `-t` flag removes everything from the output except the pids of the resulting processes from your query.

In this example I used a query to return all processes listening on port 3000 and return their PID:

```sh
lsof -ti tcp:3000
```

The output of which will look something like:

```
6540
6543
21715
```

This is perfect for piping into `kill` using `xargs`:

```sh
lsof -ti tcp:3000 | xargs kill
```

No `awk`s or `tail`s necessary! 🐕
