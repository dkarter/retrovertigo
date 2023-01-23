---
slug: avoiding-data-loss-understanding-the-ondelete-option-in-elixir-migrations
date: 2023-01-22
title: "Avoiding Data Loss: Understanding the `:on_delete` Option in Elixir Migrations"
tags: elixir, ecto, postgres, sqlite, database
---

When working with Elixir and Ecto, it is crucial to fully understand the
`on_delete` option for `references` (aka foreign keys) in migrations. This
option dictates the action to be taken on related records when the parent record
is deleted, and is essential for avoiding orphaned or inconsistent data.

The default value for the `on_delete` option on `references` is `:nothing`.
However, it's important to note that this default behavior may lead to orphaned
or inconsistent data. Instead, consider the following options for `on_delete`:

- `:delete_all` option will delete all related records.

- `:nilify_all` option will set the foreign key on all related records to NULL.

- `:restrict` option will raise an error if you try to delete a parent record that has related records.


Additionally, it's important to note that some databases have default behaviors
that differ from Ecto's defaults. This makes `on_delete: :nothing` confusing and
requires deeper familiarity with both your database, and some implementation
details of the Ecto adapter for it.

For example, in Postgres, trying to delete a referenced record will fail with
the following error, making `:nothing` more like `:restrict`:

```
[23503] ERROR: update or delete on table "authors" violates
foreign key constraint "books_author_id_fkey" on table
"books" Detail: Key (id)=(2) is still referenced from
table "books".
```

In contrast, SQLite will allow deletion of parent records without any warnings
or errors. However, SQLite does not maintain ID sequences in a separate table by
default. This can lead to severe data corruption, as new records in the parent
table can get the same ID as a previously deleted record, and subsequently
associated with orphaned records in the child table. The only way around this,
would be to explicitly set `AUTOINCREMENT` on the ID column, [which the
ecto_sqlite3 adapter doesn't currently
support](https://github.com/elixir-sqlite/ecto_sqlite3/issues/94). Additionally,
maintaining a sequence table in SQLite [carries a performance
penalty](https://www.sqlite.org/autoinc.html).


## The obvious use-case

Here's an example of a common use-case:

```elixir
defmodule BookStore.Repo.Migrations.CreateAuthorsAndBooks do
  use Ecto.Migration

  def change do
    create table(:authors) do
      add :name, :string, null: false
    end

    create table(:books) do
      add :name, :string, null: false
      add :author_id, references(:authors, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:books, [:author_id])
  end
end
```

In this example two tables will be created, `authors` and `books`, when an
author row is deleted, all books associated with that author will be deleted as
well.

This is pretty straight forward, and after understanding this example you might
be tempted to always use `:on_delete`, but there are a few "gotchas".

## Slightly more complicated and less intuitive use-case
One common pitfall when working with the `on_delete` option is thinking of the
relationship in the wrong direction.

For example, let's say you have the following scenario:

Merchants have `orders` for `customers` and each customer has multiple
`mailing_addresses`. A customer can choose to use only one `mailing_address` per
`order`.

So in this example you have:


```elixir
defmodule BookStore.Repo.Migrations.CreateCustomersOrdersAndMailingAddresses do
  use Ecto.Migration

  def change do
    create table(:customers) do
      add :name, :string, null: false
    end

    create table(:mailing_addresses) do
      add :customer_id, references(:customers, on_delete: :delete_all), null: false
      add :nickname, :string, null: false
      add :address_1, :string, null: false
      add :address_2, :string
      add :city, :string, null: false
      add :province_code, :string, null: false
      add :zipcode, :string, null: false
      add :country_code, :string, null: false
    end

    create table(:orders) do
      add :name, :string, null: false
      add :customer_id, references(:customers, on_delete: :delete_all), null: false
      add :mailing_address_id, references(:mailing_address, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:mailing_addresses, [:customer_id])
    create index(:orders, [:customer_id])
    create index(:orders, [:mailing_address_id])
  end
end
```

Did you notice the bug here? It can almost be an instinct to put `:delete_all`
on all foreign keys, but in this instance if a customer deletes a mailing
address that is associated with an order, the order will also be deleted.

I find it helpful to think of `on_delete` as:

```elixir
add :some_id, references(parent, when_parent_is_deleted: :delete_all_from_this_table)
```

In this case, we should consider one of these options instead:
- Removing the `null: false` from the `mailing_address_id` on `orders` and change
  `:delete_all` to `:nilify_all`
- Using soft deletes across the board, rather than actually deleting, so that we
  always retain copies of the orders, customers and accounts.

> My choice in this particular case would be to only soft delete records for
> accounting and customer support purposes. If privacy is a big concern, I would
> opt for anonymizing the data after soft-deleting it.

When working with the `on_delete` option in migrations, it's important to understand
the implications of each option, be familiar with the default behaviors of the
database and Ecto adapter being used, and test migrations in a development
environment before deploying to production to prevent data loss and corruption.
