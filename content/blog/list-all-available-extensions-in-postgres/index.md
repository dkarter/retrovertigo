---
slug: list-all-available-extensions-in-postgres
date: 2017-11-22 21:41:27Z
title: "List all available extensions in #Postgres"
tags: sql
original_link: https://til.hashrocket.com/posts/84gq2ppkgu-list-all-available-extensions-in-postgres
---


Postgres comes packed with extensions just waiting to be enabled!

To see a list of those extensions:


```sql
select * from pg_available_extensions;
```

This will list the extension's `name`, `default_version`, `installed_version`, and the `comment` which is a one liner description of what the extension does.

Here's an interesting one for example:

```
name              | earthdistance
default_version   | 1.1
installed_version | ø
comment           | calculate great-circle distances on the surface of the Earth
```


To enable an extension, simply call `create extension` on the name:

```sql
create extension if not exists earthdistance;
```


