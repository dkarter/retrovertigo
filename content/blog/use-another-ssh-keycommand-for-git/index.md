---
slug: use-another-ssh-keycommand-for-git
date: 2018-10-05 19:03:31Z
title: "Use another SSH key/command for Git"
tags: git
original_link: https://til.hashrocket.com/posts/kza2rh7uak-use-another-ssh-keycommand-for-git
---


If you need to use a different SSH key for a git command such as `git push` you can do so by setting the `GIT_SSH_COMMAND` environment variable like so:

```bash
GIT_SSH_COMMAND="ssh -i ~/.ssh/custom_key" git push
```

This can become a lot easier to use if you define that env var automatically when entering a directory by using [direnv](https://github.com/direnv/direnv).

h/t Thomas Allen
