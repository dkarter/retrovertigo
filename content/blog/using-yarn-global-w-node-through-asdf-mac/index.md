---
slug: using-yarn-global-w-node-through-asdf-mac
date: 2018-05-07 16:40:14Z
title: "Using `yarn global` w/ Node through asdf (mac)"
tags: javascript
original_link: https://til.hashrocket.com/posts/esd7dvzfme-using-yarn-global-w-node-through-asdf-mac
---


The asdf version manager is an awesome tool for managing many different language runtime versions. I recently started using it for Node and noticed that `yarn global` no longer plays nice with it.

Turns out that if you install yarn through homebrew - your global directory will not take into account the asdf node version and path.

To correct this, first uninstall yarn from homebrew:

```sh
brew uninstall yarn
```

Then in your `.zshrc` or equivalent remove the yarn global path (see my previous post about [Yarn global](https://til.hashrocket.com/posts/abfcbb7613-yarn-global))

Now you want to find where asdf is being sourced into your .zshrc and insert a dynamic yarn global path:

> ~/.zshrc
```sh
# asdf global version manager
source "$HOME/.asdf/asdf.sh"
source "$HOME/.asdf/completions/asdf.bash"

# set yarn binaries on path
# must be below the .asdf source commands ^
export PATH="$(yarn global bin):$PATH"
```

You can now install yarn again from npm which will put it in your asdf versioned node:

```sh
npm i -g yarn
```

When done restart your terminal and test to see that everything worked. I had to delete the `~/.config/yarn/global` to make this work.

`echo $PATH` should contain something that looks like `/Users/dkarter/.asdf/installs/nodejs/9.11.1/.npm/bin` which should match `yarn global bin`.
