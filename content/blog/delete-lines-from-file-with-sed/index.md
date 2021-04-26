---
slug: delete-lines-from-file-with-sed
date: 2019-05-03 19:59:40Z
title: "Delete lines from file with sed"
tags: command-line
canonicalName: "Hashrocket TIL"
canonicalUrl: https://til.hashrocket.com/posts/dreswmoqrx-delete-lines-from-file-with-sed
---


Imagine the following file:

> sed.test

```
hised
hellosed
goodbyesed
```

If you want to delete a line matching a regular expression (e.g. `hellosed`), you can use `d` at the end of your regular expression.

```sh
sed '/hellosed/d' sed.test
```

Output:


```
hised
goodbyesed
```

However the file did not change:


> `cat sed.test`

```
hised
hellosed
goodbyesed
```

To write the file in place use the `-i [suffix]` option. This argument allows you to specify the suffix of the backup file to be saved before committing your changes. For example:


```sh
sed -i '.bak' '/hellosed/d' sed.test
```

Now the file will be modified with our changes but we will also get a backup of the original file in   `sed.test.bak`.

If you like living on the edge 🛩, and don't want those pesky backup files littering your system, you can supply `-i` with an empty suffix, causing no backup file to be saved.

```sh
sed -i '' '/hellosed/d' sed.test
```

