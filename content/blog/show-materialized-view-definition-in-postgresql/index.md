---
slug: show-materialized-view-definition-in-postgresql
date: 2018-05-31 20:00:15Z
title: "Show materialized view definition in #postgresql"
tags: sql
original_link: https://til.hashrocket.com/posts/gh42hxndbm-show-materialized-view-definition-in-postgresql
---


PSQL offers a handy `\dv` function for showing the definition of a view. That function does not seem to work on materialized views. 

To see the definition of a materialized view use the following instead:

```sql
select pg_get_viewdef('search_documents');
```

Another option is to use `\d+ search_documents` which shows both the query and the columns.

(Replace `search_documents` with the name of your view.)
