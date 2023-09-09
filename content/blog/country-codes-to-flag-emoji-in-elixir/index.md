---
slug: country-codes-to-flag-emoji-in-elixir
date: 2023-09-09
title: 'Country codes to flag emoji in Elixir'
tags: elixir
image: ../../assets/to-flag-emoji.png
---

I just read [this blog post](https://dev.to/jorik/country-code-to-flag-emoji-a21).
It showed, in JavaScript, how to convert country code string to its respective
flag emoji, and I wanted to see what it would look like in Elixir. So I pulled
up iex and came up with the following:

```elixir
@doc """
Convert country code to Flag Emoji

## Examples

    iex> to_flag_emoji("US")
    "🇺🇸"

    iex> to_flag_emoji("NL")
    "🇳🇱"

    iex> to_flag_emoji("CH")
    "🇨🇭"

    iex> to_flag_emoji("IT") == to_flag_emoji("it")
    true
"""
def to_flag_emoji(code) do
  code
  |> String.upcase()
  |> String.to_charlist()
  |> Enum.map(&(&1 + 127397))
  |> to_string()
end
```

Here's the explanation:

> The flag emoji is a combination of the two unicode region characters, located
> at unicode position `127462` for the letter `A`. For `CH` (Switzerland), we
> want the indexes to be `127464` and `127469`.

And with ExUnit's doctests, we get tests for free from the examples. Gotta love
the Elixir stdlib!
