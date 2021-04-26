---
slug: postgres-automatically-appends-timezone
date: 2018-02-18 10:06:00Z
title: "Postgres automatically appends timezone"
tags: sql
canonical: https://til.hashrocket.com/posts/noktunb4zn-postgres-automatically-appends-timezone
---


Dates can be notoriously hard, particularly when it comes to timezones.

If you select a date without timezone information and cast it to a data type w/timezone, Postgres will assume the timezone of the server:

```sql
select '2000-01-01'::timestamptz;
┌────────────────────────┐
│      timestamptz       │
├────────────────────────┤
│ 2000-01-01 00:00:00-06 │
└────────────────────────┘
```

I'm located in CST hence the `-06` at the end of the time specification (6 hours before UTC time).

To use a specific timezone such as UTC, instead of your server's timezone which can be pretty arbitrary:


```sql
select '2000-01-01'::timestamptz at time zone 'UTC';
┌─────────────────────┐
│      timezone       │
├─────────────────────┤
│ 2000-01-01 06:00:00 │
└─────────────────────┘
```

Postgres now displays the time in UTC. Still probably not what you expected (6am?) - Postgres infers the `00:00:00` time in your timezone and converts it to UTC (in my case adding 6 hours).

So how would you get it to show `00:00:00` and still be in UTC timezone?

```sql
select '2000-01-01 00:00:00 UTC'::timestamptz at time zone 'UTC';
┌─────────────────────┐
│      timezone       │
├─────────────────────┤
│ 2000-01-01 00:00:00 │
└─────────────────────┘
```

If you use timezone aware data types it is recommended to always specify the timezone when inserting data, otherwise you are in for a world of trouble.
