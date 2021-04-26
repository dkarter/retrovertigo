---
slug: whatis-command-and-apropos-in-linux-bash
date: 2017-11-20 20:56:03Z
title: "whatis command and apropos in #linux #bash"
tags: command-line
original_link: https://til.hashrocket.com/posts/ff2b9vvamf-whatis-command-and-apropos-in-linux-bash
---


Ever wonder what a command you are using is? Turns out linux has the answers for you!

Simply type `whatis` followed by the name of the command.

Examples:

```sh
$ whatis bc
bc(1)         - An arbitrary precision calculator language
$ whatis brew
brew(1)       - The missing package manager for macOS
brew-cask(1)  - a friendly binary installer for macOS
```

`whatis` uses the man pages to search your entered query.

There is also a reverse search, which searches the descriptions of commands. For example say you are looking for a calculator:

```sh
$ apropos calculator
bc(1)         - An arbitrary precision calculator language
dc(1)         - an arbitrary precision calculator
```

h/t [this tweet by Peter Cooper](https://twitter.com/peterc/status/932591484175638528)
