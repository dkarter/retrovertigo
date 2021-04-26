---
slug: storing-recurring-schedules-in-rails-postgres
date: 2017-10-18 16:00:56Z
title: "Storing recurring schedules in #Rails + #Postgres"
tags: rails
canonical: https://til.hashrocket.com/posts/qfmz45qidl-storing-recurring-schedules-in-rails-postgres
---


If you have a scheduling component to your Rails application you may need to store the day of week and time of day in the database.

One way to store the day of week is to use an integer column with a check constraint that will check that the value is between 0 and 6.

```sql
create table schedules (
  id serial primary key,
  day_of_week integer not null check(day_of_week in (0,1,2,3,4,5,6)),
  beg_time time not null,
  end_time time not null
);
```

Then when you read it back from the database and need to convert it back to day name you can use `Date::DAYNAMES`. e.g.:

```ruby
[2] pry(main)> require 'date'
=> true
[3] pry(main)> Date::DAYNAMES
=> ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
[4] pry(main)> Date::DAYNAMES[0]
=> "Sunday"
[5] pry(main)>
```

If you need to store time of day as entered (in a time without timezone column - as specified above) check out the wonderful [Tod gem](https://github.com/JackC/tod) by [Jack Christensen](https://github.com/JackC)
