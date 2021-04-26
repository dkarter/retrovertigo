---
slug: get-a-writable-temporary-directory-in-elixir
date: 2019-08-20 22:28:57Z
title: "Get a writable temporary directory in Elixir"
tags: elixir
original_link: https://til.hashrocket.com/posts/8rkl48vqmc-get-a-writable-temporary-directory-in-elixir
---


When you need to write a temporary file to disk it is common to assume a particular path exists based on the operating system the app is running on:

```elixir
tmp_file = Path.join("/tmp", filename)
File.write!(tmp_file)
```

However depending on the configuration of the app as it is deployed in production, it may not have access to the `/tmp` directory. Fortunately Elixir provides a function that returns a writable path for temporary files:

```elixir
dir = System.tmp_dir!()
tmp_file = Path.join(dir, filename)
File.write!(tmp_file)
```

From [the docs](https://hexdocs.pm/elixir/System.html#tmp_dir/0) (`h System.tmp_dir`):

```
Writable temporary directory.

Returns a writable temporary directory. Searches for directories in the following order:

    1. the directory named by the TMPDIR environment variable
    2. the directory named by the TEMP environment variable
    3. the directory named by the TMP environment variable
    4. C:\TMP on Windows or /tmp on Unix
    5. as a last resort, the current working directory

Returns nil if none of the above are writable.
```

I prefer to use the "bang" version `System.tmp_dir!` described as:

> Same as `tmp_dir/0` but raises `RuntimeError` instead of returning `nil` if no temp dir is set.

On my machine it returns something like this:

```elixir
"/var/folders/66/dj7rwns53vn4db4_1npvqtrh0000gn/T/"
```
