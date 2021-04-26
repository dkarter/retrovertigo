---
slug: delete-remote-git-branch-the-declarative-way
date: 2019-01-18 21:03:10Z
title: "Delete remote git branch - the declarative way"
tags: git
canonical: https://til.hashrocket.com/posts/ixpekrbuzw-delete-remote-git-branch-the-declarative-way
---


Cleaning up after yourself is important, and not just in real life. Good _Git Hygiene™_ goes a long way.

One of the methods I like to clean up is deleting unused feature branches. I do that both locally and on the remote source control server (github/gitlab etc).

As is common with Git there are many ways to feed a cat. Some people use this:

```sh
git push origin :name-of-branch
```

I prefer the more declerative way, especially for potentially destructive operations such as deleting a remote branch:

```sh
git push origin --delete name-of-branch
```

Either way, keeping your remote branches trim makes for a happier development team!
