---
slug: case-insensitive-in-query-in-postgres-psql
date: 2018-04-23 16:55:09Z
title: "Case insensitive `in` query in #postgres #psql"
tags: sql
canonicalName: "Hashrocket TIL"
canonicalUrl: https://til.hashrocket.com/posts/o0ohxzb7ho-case-insensitive-in-query-in-postgres-psql
---


If you have a list of strings and you want to query a column to get all the matching records, but you do not care about the casing, Postgres offers a cool and easy way of doing that with the citext extension.

Given this table:

```sql
id | company_name
 1 | Abibas
 2 | Nykey
 3 | Pumar
```

We want to match the following:

```sql
select company_name
from vendors 
where company_name in ('Abibas', 'NyKey', 'PUMAr');
```

First you will have to make sure you have the `citext` extension created if you haven't already:

```sql
create extension citext;
```

Then you can cast the searched field to citext:

```sql
select company_name
from vendors 
where company_name::citext in ('Abibas', 'NyKey', 'PUMAr');
```

h/t [joshbranchaud](https://til.hashrocket.com/authors/joshbranchaud) for helping me find this
