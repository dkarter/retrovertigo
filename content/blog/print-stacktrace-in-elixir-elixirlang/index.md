---
slug: print-stacktrace-in-elixir-elixirlang
date: 2020-03-12 18:13:04Z
title: "Print stacktrace in Elixir #ElixirLang"
tags: elixir
canonical: https://til.hashrocket.com/posts/3dcv3lebql-print-stacktrace-in-elixir-elixirlang
---


When you are trying to debug something it is usually helpful to see the stacktrace of what called a function.

If you're inside of a `try` expression, and within the `catch` or `rescue` block, that's easy - use the [`__STACKTRACE__` Special Form](https://hexdocs.pm/elixir/Kernel.SpecialForms.html#__STACKTRACE__/0).

```elixir
try do
	# NOPE
rescue
  ArgumentError ->
    IO.puts("Stacktrace #{inspect(__STACKTRACE__)}")
catch
  value ->
    IO.puts("Stacktrace #{inspect(__STACKTRACE__)}")
else
  # NOPE
after
  # NOPE
end
```

For all other cases the incantation is a little more complicated (and if you don't think you can remember it, perhaps set up a snippet):

```elixir
self()
|> Process.info(:current_stacktrace)
|> IO.inspect(label: "---------> stacktrace")
```
