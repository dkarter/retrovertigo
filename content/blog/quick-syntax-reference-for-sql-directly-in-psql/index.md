---
slug: quick-syntax-reference-for-sql-directly-in-psql
date: 2018-02-18 07:45:26Z
title: "Quick syntax reference for #SQL directly in #psql"
tags: sql
original_link: https://til.hashrocket.com/posts/7ikwxjzbhh-quick-syntax-reference-for-sql-directly-in-psql
---


Whenever I forget the syntax for a certain SQL command in Posgres I usually reach for [Dash](https://kapeli.com/dash) or simply search DuckDuckGo for the the specific command. That usually yields the Postgres official documentation website which is great...

Wouldn't it be nice though if I could stay right inside psql and get the documentation I am looking for?

It would.. and it's possible:

```
\h create index
```

![create index screenshot](https://i.imgur.com/Nm0lY3u.png)

Use `\h` followed by the SQL command - this is not the full verbose documentation that you would find on the Postgres docs website but it's more of a syntax reference - which is most of the time what you need.


If you are not sure what to type or simply want to explore new commands try typing `\h` without anything after it - you will see something like this:

![slash h by itself screenshot](https://i.imgur.com/PRIgAm5.png)
