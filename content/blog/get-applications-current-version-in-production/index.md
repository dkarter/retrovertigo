---
slug: get-applications-current-version-in-production
date: 2018-04-16 00:48:10Z
title: "Get application's current version in production"
tags: elixir
canonicalName: "Hashrocket TIL"
canonicalUrl: https://til.hashrocket.com/posts/0cbedskujk-get-applications-current-version-in-production
---


If you use Distillery to produce Elixir releases for production you may be in a situation where your application is deployed and running but you are not sure what version is loaded into memory.

To verify the version:

1. SSH into your server
2. navigate into the bin directory of your release (e.g. `app_release/your_project/bin`)
3. run the remote console `./your_project remote_console`
4. Run the `spec` function on `Application`: `Application.spec(:your_project, :vsn)`

You will get back a string such as '0.0.1'.

