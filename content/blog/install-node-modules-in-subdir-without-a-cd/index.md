---
slug: install-node-modules-in-subdir-without-a-cd
date: 2019-02-01 20:53:40Z
title: "Install node modules in subdir without a CD"
tags: javascript
original_link: https://til.hashrocket.com/posts/ueyckrbx7p-install-node-modules-in-subdir-without-a-cd
---


So yea you don't need a friend to send you a CD-ROM anymore to install node modules. You can use the World Wide Web! Pretty exciting.

On a more serious note, if your front-end is stored in a sub directory of your project, for example:

```bash
❯ tree -d -L 2
.
├── assets
|   ├── package.json
|   └── package-lock.json
└── app
```


Normally you would `cd` into assets, run `npm i`, and `cd` back out to the project root so you can go back to doing important things:

```bash
cd assets
npm i
cd -
```

Or you can push and pop, cause you're kinda smart 

```bash
pushd assets && npm i && popd
```

Or if you're a really cool kid you'd use a sub-shell 

```bash
(cd assets && npm i)
```

But wait! There's another option - use the `prefix` CLI option in NPM!

```bash
npm i --prefix assets
```

It works really well for those long Dockerfile `RUN` statements.
