---
slug: never-use-git-branch-in-a-script-without-doing-this
date: 2022-02-01
title: "Never use `git branch` in a script without doing this!"
tags: git, scripting, automation, workflow, fzf
---

I like automating commands that I run often, and one of my favorite command line
tools to use when automating scripts involving selection is
[FZF](https://github.com/junegunn/fzf).

A very common task I do is create PR
based on another git branch, or it's more advanced version: [create a PR based on a Jira
ticket, as I published in a previous post](https://doriankarter.com/create-github-prs-from-jira-ticket/).

Here's a simple example using FZF and [Github CLI](https://cli.github.com/):

```bash
gh pr create --base "$(git branch | fzf)" --draft --title "[DRAFT] Feature XYZ"
```

Cool, right?! In this example the branch I select is likely going to be some
integration branch different than my current branch and everything should work
fine.

But what happens when I need to use the current branch name in a script?
For example, let's say you are trying to push the current branch to a different remote branch[^1].

Easy! Let's use `git branch` and pipe it into `fzf` as before, right?

```bash
git push $(git branch | fzf):some-remote-branch
```

Not so fast, cowboy! It's easy to forget that, but `git branch` is a CLI command
with output intended for humans, not scripts. Let's review again what happens if
we call `git branch`:

```
  develop
* XYZ-123-smtp-client
  ABC-456-shopify-api
```

In this example `git` is trying to be helpful by showing you which branch is the
current one with the `*` character. Unfortunately, `*` is also a meaningful
character which is parsed by `git` as a wildcard 🙀. So if you ran this command
above, and selected the current branch this is going to be the actual command:

```bash
git push * XYZ-123-smtp-client:some-remote-branch
```

Which `git` then translates to "all local branches":

```bash
git push develop ABC-456-shopify-api XYZ-123-smtp-client XYZ-123-smtp-client:some-remote-branch
```

Yikes! This means that your local copy of `ABC-456-shopify-api`,
`XYZ-123-smtp-client` and `develop` (stale / with any changes they have over the
remote) will be unintentionally pushed to their default upstream branch as well!

And that's only if you have 2 stale branches locally, what if you have
more?![^2]

The reason I didn't catch this for many years has been because I usually needed
to grab the name of another branch.

Thankfully `git branch` has a `--format` option that allows returning just the
branch names with no "current" indicator:

```bash
git branch --format='%(refname:short)'
```

Next time you use `git branch` in a script remember to use the `--format` flag to
avoid a mess!

[^1]: Maybe you think this is a contrived example because you can just type your
      branch name and call it a day. But what if you use this command often and
      your branch names are by convention long and annoying to type because they
      contain a ticket number and the ticket title.

[^2]: You may want to check out [this other alias I use to clean remotely deleted
      branches locally](https://github.com/dkarter/dotfiles/blob/1862e076e0e3383aa5dad939c4b205f39a19175b/aliases#L94).
