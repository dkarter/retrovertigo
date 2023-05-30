---
slug: unraveling-homebrew-dependencies-a-handy-guide
date: 2023-05-29
title: 'Unraveling Homebrew Dependencies: A Handy Guide'
tags: homebrew, macOS, linux
image: ../../assets/hops.jpg
---

Have you ever installed something using Homebrew and noticed the command's output updating seemingly unrelated packages? This recently happened to me, and it piqued my curiosity. As a result, I embarked on a journey to understand how package dependencies work within the Homebrew universe. This post is a friendly guide to what I've discovered, which I hope will help others navigate the complex web of package dependencies.

## Setting the Scene

I installed `bear`, a utility that generates compilation databases for the C programming language, and surprisingly, the output indicated an update for `teleport`, a completely unrelated package I use to connect to our Kubernetes clusters at work. Here's the command I used:

```bash
brew install bear
```

I quickly realized that `teleport` couldn't possibly be a direct dependency of `bear`. This led me to hypothesize that they might share common dependencies. But how could I confirm this? Well, this turned out to be a fantastic opportunity to learn some new commands.

## The Investigation

I learned about the `brew uses` command, which is a helpful tool for exploring what packages are using a particular package. I tested this command by checking what depends on `openssl@1.1`, assuming a large number of packages would. Here's what I found:

```bash
brew uses --recursive --installed openssl@1.1
```

```
apr-util     exa          gnutls       libgit2      nmap         python@3.11  tmate
autojump     ffmpeg       grpc         libpq        node         rtmpdump     tmux
bear         freetds      krb5         libssh       openldap     ruby         unbound
borgbackup   global       libevent     libssh2      php          srt          yt-dlp
curl         gnupg        libfido2     llvm         pspg         teleport
```

Interestingly, both `bear` and `teleport` depend on `openssl@1.1`. If `bear` and `teleport` share the same dependencies but require different versions, Homebrew will try to resolve this conflict.

## Finding Common Ground

I then sought to understand how to use the diff command on Linux to show similarities, not differences. Despite trying many approaches, I found a more effective command that was new to me: comm. The man page for comm reads:

```bash
man comm
```

```
comm – select or reject lines common to two files

     The following options are available:

     -1      Suppress printing of column 1, lines only in file1.

     -2      Suppress printing of column 2, lines only in file2.
```

Let's use `comm` to compare the dependencies between `bear` and `teleport`:

```bash
comm -12 <(brew deps bear) <(brew deps teleport)
```

This produces the following output:

```
c-ares
ca-certificates
openssl@1.1
```

During the `bear` installation, I noticed that `c-ares` was updated, and Homebrew provided a hint that I had previously overlooked:

```
==> Upgrading 2 dependents of upgraded formulae:
Disable this behaviour by setting HOMEBREW_NO_INSTALLED_DEPENDENTS_CHECK.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
node 19.8.1 -> 20.2.0, teleport 12.1.5 -> 13.0.3
```

Furthermore, `teleport` depends on `node` (which also depends on `c-ares`), so this could be another reason for the update.

## Digging Deeper

Wanting to understand why `teleport` depends on `c-ares`, I delved further:

```bash
brew deps teleport --tree
```

Output:

```
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

It turns out that node depends on `c-ares`, and `teleport` depends on `node`. This interdependency was the key!

## Conclusion

Through this exploration, I acquired valuable tools that will undoubtedly come in handy for troubleshooting Homebrew package dependencies in the future. If you ever find yourself puzzled by unexpected package updates in Homebrew, I encourage you to use these commands to unravel the mysteries of package dependencies. Remember, a deeper understanding of your tools can only make you a more effective problem-solver. Happy brewing!
