---
slug: what-does-that-git-alias-do
date: 2020-01-28 15:48:47Z
title: "What does that git alias do? 🕵️‍♂️"
tags: git
canonical: https://til.hashrocket.com/posts/mnov8h5k09-what-does-that-git-alias-do-
---


I have some git aliases in my [dotfiles](https://github.com/dkarter/dotfiles) and sometimes I use an alias for too long that I actually forget what it does under the hood.

I can open my `~/.gitconfig` file in nvim [(which I have an alias for)](https://github.com/dkarter/dotfiles/blob/5b6d394625eaa0f52b95192c8d453f73ee5fc271/aliases#L156) and search for the line that introduced the alias, but when pairing sometimes it's easier and faster to just use `git help` to get the definition of an alias:

```bash
git help doff
```

```
'doff' is aliased to 'reset HEAD^'
```
