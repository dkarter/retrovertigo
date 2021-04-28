---
slug: create-github-prs-from-jira-ticket
date: 2021-02-24
title: "Create Github PRs from a Jira Ticket"
tags: workflow, automation, jira, fzf, github
---

TL; DR: add this function to your `.bashrc`/`.zshrc` to create a PR from a Jira ticket:

```bash
# create a draft PR from Jira ticket name and number, based off a different branch
jpr() {
  gh pr create --base "$(git branch | fzf)" --draft --title "$(jira i | fzf | ruby -ne 'i = $_.strip.split(/\s{2,}/); puts "[#{i[0]}] #{i[2]}"')"
}
```

---

<br />

If you use Jira at work, but prefer to live in the terminal whenever possible, here's a quick recipe to create PRs from your assigned tickets.

For this recipe you will need:

- 3 cage free eggs
- 2 cups of [FZF](https://github.com/junegunn/fzf)
- 1 [Jira CLI](https://jiracli.com/) 
- 1 whole grain [Github CLI](https://cli.github.com/)
- And a dash of Ruby

First, take the eggs and put them in your fridge, they will keep longer, and you can use them later to make an omelette.

After you've installed and configured all the above we can start digging into how this script works.

First to create a new PR we use Github CLI's `pr create` command. We supply three options:

- `--base` the base branch for that PR (in most cases that will be the main branch, other times it could be a longer running integration branch)
- `--draft` creates a draft PR (this is useful when creating a PR through the CLI since you will likely want to browse your changes in the Github before submitting it for review)
- `--title` sets the title of the PR

```bash
gh pr create --base "" --draft --title ""
```

In order to pick the base branch we use `FZF` to fuzzy find the name of the branch you want to base off. If you rarely create PRs against branches that are not your main branch then feel free to omit the `--base ...` argument. We'll use [command substitution](https://www.gnu.org/software/bash/manual/html_node/Command-Substitution.html) to interpolate the result of that selection into previous command.

```bash
gh pr create --base "$(git branch | fzf)" --draft --title ""
```

For the title we invoke the Jira CLI and get our list of assigned issues. This list gets piped into FZF for easy searching. 

```bash
jira i | fzf
```

The output looks something like this:

```
  XYZ-123    Code Review           Setup Sentry
```

Finally we pipe the output of the previous command into Ruby so that we can remove the ticket status ("Code Review") and create a title for the PR:

```bash
jira i | fzf | ruby -ne 'i = $_.strip.split(/\s{2,}/); puts "[#{i[0]}] #{i[2]}"'
```

This script will take the piped input, `$_`, split it by strings containing 2 or more spaces, and print the first part of the split surrounded by square brackets [ticket number], followed by the last part, the ticket's title. The result should look like:

```
[XYZ-123] Setup Sentry
```

This should allow linking the PR to the ticket in Jira if you have that integration set up correctly.

As before, interpolate the sub script as a command substitution after the title argument. The final result should look like this:

```bash
gh pr create --base "$(git branch | fzf)" --draft --title "$(jira i | fzf | ruby -ne 'i = $_.strip.split(/\s{2,}/); puts "[#{i[0]}] #{i[2]}"')"
```

Put it inside a function with a name you'll remember and drop it into your `.bashrc`/`.zshrc`:

```bash
# create a draft PR from Jira ticket name and number, based off a different branch
jpr() {
  gh pr create --base "$(git branch | fzf)" --draft --title "$(jira i | fzf | ruby -ne 'i = $_.strip.split(/\s{2,}/); puts "[#{i[0]}] #{i[2]}"')"
}
```

Now you have time to go make that omelette.
