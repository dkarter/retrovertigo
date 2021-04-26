---
slug: no-ifconfig-on-linux
date: 2020-02-03 15:20:26Z
title: "No ifconfig on Linux?"
tags: command-line
canonical: https://til.hashrocket.com/posts/5cuii1iosi-no-ifconfig-on-linux
---


If you are on a Linux machine and trying to run `ifconfig` you may get `Command not found: ifconfig`. That is because some Linux distros don't come with it bundled by default.

On Manjaro Linux which is an Arch Linux based distro you can use `pacman` to install the package containing `ifconfig` called `net-tools`:

```bash
sudo pacman -S net-tools
```

On Debian based distros you can use:

```bash
sudo apt-get install net-tools
```

If you don't want to install `net-tools` you can try using the `ip` command:

```bash
ip addr
```

This will return the interfaces on your machine and their IP bindings.
