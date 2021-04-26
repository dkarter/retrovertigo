---
slug: use-a-proxy-on-curlwget-commands
date: 2018-04-17 14:13:56Z
title: "Use a proxy on curl/wget commands"
tags: command-line
canonicalName: "Hashrocket TIL"
canonicalUrl: https://til.hashrocket.com/posts/igveoltssz-use-a-proxy-on-curlwget-commands
---


Using a proxy can be a good way to debug http issues. Unfourtunately setting the proxy on macOS globally does not apply to all command line utilities.

On Curl for example you can set the proxy using the `--proxy` flag:

```bash
curl http://example.com --proxy 127.0.0.1:8080
```

Or by adding the following to your `~/.curlrc` configuration file for a more persistent setting:

```
proxy = 127.0.0.1:8080
```

A similar thing can be done with the `wget` utility by editing the `~/.wgetrc` and adding:

```
http_proxy = http://127.0.0.1:8080
```
