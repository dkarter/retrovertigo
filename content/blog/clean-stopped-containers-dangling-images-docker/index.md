---
slug: clean-stopped-containers-dangling-images-docker
date: 2019-05-29 16:01:20Z
title: "Clean stopped containers & dangling images #docker"
tags: devops
original_link: https://til.hashrocket.com/posts/er6gdncdah-clean-stopped-containers-dangling-images-docker
---


Today I learned how to clean stopped containers in Docker. Starting in [Docker 1.13](https://github.com/moby/moby/blob/master/CHANGELOG.md#1130-2017-01-18) a new `prune` command has been introduced.

```bash
docker container prune
```

[(docs)](https://docs.docker.com/engine/reference/commandline/container_prune/)

### No one likes dangling images...

To list the numeric ids of dangling images dangling images use the filter with the dangling flag and `-q` to surpress anything but IDs:

```bash
dangling_images=$(docker images -qf dangling=true)
```

[(docs)](https://docs.docker.com/engine/reference/commandline/images/)

Then delete the images

```bash
docker rmi $dangling_images
```

[(docs)](https://docs.docker.com/engine/reference/commandline/rmi/)

You can add those to a script and run it from time to time to reclaim hard drive space and some sanity.
