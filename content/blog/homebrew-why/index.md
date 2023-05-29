---
slug: homebrew-why
date: 2023-05-29
title: 'Homebrew why?'
tags: macOS, homebrew
---

Sometimes you install something with homebrew, and see the output of the command update seemingly unrelated packages.

I recently installed `bear`, which generates compilation database for clang tooling, and saw the output include a completely unrelated package that I have installed for work, `teleport`, which I use to connect to our K8s clusters.

Here's the command I used:

```bash
$ brew install bear
```

My first thought was `teleport` cannot be a dependency of bear, so they might be sharing similar dependencies, but I wasn't sure how to confirm this and this was a great opportunity to learn some new commands.

First I learned about `brew uses` which helps explore what packages are using a particular package.

I tried this command by checking what depends on `openssl@1.1`, which I figured would be a lot of other packages, and got the following:

```bash
$ brew uses --recursive --installed openssl@1.1
apr-util     exa          gnutls       libgit2      nmap         python@3.11  tmate
autojump     ffmpeg       grpc         libpq        node         rtmpdump     tmux
bear         freetds      krb5         libssh       openldap     ruby         unbound
borgbackup   global       libevent     libssh2      php          srt          yt-dlp
curl         gnupg        libfido2     llvm         pspg         teleport
```

Notice that both `bear` and `teleport` rely on `openssl@1.1`. If `bear` and `teleport` share the same dependencies, but bear relies on a different version than `teleport` than homebrew will need to resolve this conflict whenever possible.

Then I went on to learn how I can use the `diff` command in linux to only show similarities, and not differences. I tried many different ways but ultimately found a much better command that I haven't used previously, `comm`. From the `man` page:

```
comm – select or reject lines common to two files

     The following options are available:

     -1      Suppress printing of column 1, lines only in file1.

     -2      Suppress printing of column 2, lines only in file2.
```

Let's try this by comparing dependencies between `bear` and `teleport`:

```bash
$ comm -12 <(brew deps bear) <(brew deps teleport)
```

Output:

```
c-ares
ca-certificates
openssl@1.1
```

When installing `bear` I did see that `c-ares` was updated, and homebrew even gives me a hint that I previously missed:

```
==> Upgrading 2 dependents of upgraded formulae:
Disable this behaviour by setting HOMEBREW_NO_INSTALLED_DEPENDENTS_CHECK.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
node 19.8.1 -> 20.2.0, teleport 12.1.5 -> 13.0.3
```

Also `teleport` depends on `node` (which also depends on `c-ares`) so that could be another reason why it was updated.

Further exploration reveals why `teleport` depends on `c-ares`:

```bash
$ brew deps teleport --tree
teleport
├── libfido2
│   ├── libcbor
│   └── openssl@1.1
│       └── ca-certificates
└── node
    ├── brotli
    ├── c-ares
    ├── icu4c
    ├── libnghttp2
    ├── libuv
    └── openssl@1.1
        └── ca-certificates
```

It is because node depends on this package, and teleport depends on node!

I'm sure these tools will come in handy one day for resolving a problem with homebrew package dependencies.
