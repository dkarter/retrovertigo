---
slug: automatic-versioning-and-changelogs-with-conventional-commits
date: 2022-05-13
title: "Automatic versioning and changelogs with Conventional Commits"
tags: git, workflow
---

One of the constant things I've seen across all the companies I worked for is that no matter where it is, there is never a consistent Git commit style. And I mainly get why it is this way:

- **Different levels of experience**: a more junior developer may have not been exposed yet to best practices for commit messages and just sees commits as means to an end
- **Different preferences**: some developers might have their own style they prefer to stick to, it may be an informed opinion or just a habit from years of doing it one way.

While there isn't technically a right or wrong answer
to how you should format your commit messages, one
recent approach I tried has had great side effects. It
is called [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Here's the TLDR:

## Benefits of using Conventional Commits
- Automatic semantic versioning
- Automatic changelogs
- Encourages smaller commits (because it makes you
  think about what the commit does)

## Drawbacks
- Can't use squash and merge (well technically you can
  but some information may be lost)
- You shouldn't use squash and merge anyway because it
  is lossy and makes tools like `git bisect` & `git
  blame` useless
## How I implemented it into my workflow
- `gap` - have been using this for years and it is
  still a great tool for creating small, atomic
  commits
- Telescope suggestions (add screenshot)
- Husky
