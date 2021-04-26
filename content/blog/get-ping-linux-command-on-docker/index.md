---
slug: get-ping-linux-command-on-docker
date: 2019-04-18 16:01:38Z
title: "Get `ping` linux command on docker"
tags: devops
original_link: https://til.hashrocket.com/posts/tt3ljzfnkn-get-ping-linux-command-on-docker
---


The ping utility is super useful for debugging network issues on docker, but it's package name is not as intuitive as `ping`.

To get it on your docker (for `slim` based environments) type:

```
apt-get install iputils-ping
```
