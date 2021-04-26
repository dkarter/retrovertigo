---
slug: get-the-linux-ip-command-line-utility-on-docker
date: 2019-04-18 15:55:27Z
title: "Get the linux `ip` command line utility on docker"
tags: devops
canonicalName: "Hashrocket TIL"
canonicalUrl: https://til.hashrocket.com/posts/8rq0hxc3jw-get-the-linux-ip-command-line-utility-on-docker
---


Linux has a network utility called `ip` which can be very useful when debugging networking issues inside a docker machine.

If you type `ip` inside your docker container and you get "Command not found", don't fret.

On `slim` based machines simply run:

```
apt-get install iproute
```
