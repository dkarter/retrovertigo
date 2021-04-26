---
slug: simple-text-file-encryption-with-vim
date: 2017-11-29 19:53:21Z
title: "Simple text file #encryption with Vim"
tags: vim
canonicalName: "Hashrocket TIL"
canonicalUrl: https://til.hashrocket.com/posts/qkoxblhqfr-simple-text-file-encryption-with-vim
---


Vim provides a simple text file encryption feature. To make use of it add the following to your .vimrc:

```vim
set cryptmethod=blowfish2
```

This will set the encryption to the strongest algorithm vim supports.

Now to use it simply start editing a file with the `-x` flag:

```bash
$ vim -x mysecret.txt
```

You will be prompted for a password, and password confirmation. After that you should be able to edit the file and save it normally.

When you open the file again with vim (even without the `-x` flag) you will be asked to type your password to decrypt the file. If you enter the wrong password all you'll see is gibberish.

This is not the strongest encryption out there but it works and should suffice for most personal use cases.

NOTE: this will not work with NeoVim.
