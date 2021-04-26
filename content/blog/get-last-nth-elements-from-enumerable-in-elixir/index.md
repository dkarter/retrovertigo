---
slug: get-last-nth-elements-from-enumerable-in-elixir
date: 2018-06-23 04:11:56Z
title: "Get last nth elements from Enumerable in #Elixir"
tags: elixir
canonicalName: "Hashrocket TIL"
canonicalUrl: https://til.hashrocket.com/posts/kn0qm5dnda-get-last-nth-elements-from-enumerable-in-elixir
---


You probably know about `Enum.take(n)` where `n` is a number dictating how many elements you want to take from an Enumerable. Use it like this:

```elixir
[1, 2, 3, 4, 5]
|> Enum.take(3)
# => [1, 2, 3]
```

But how can you get the last 3 elements? Just use a negative number!

```elixir
[1, 2, 3, 4, 5]
|> Enum.take(-3)
# => [3, 4, 5]
```
