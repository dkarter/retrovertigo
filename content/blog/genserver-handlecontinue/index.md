---
slug: genserver-handlecontinue
date: 2022-03-20
title: "GenServer handle_continue/2"
tags: elixir
---

I recently learned about a delightful new(ish) feature in Elixir's GenServer that
managed to slip under my radar. This feature is the `handle_continue` callback
it has been around since Elixir 1.7 requires OTP 21+ to work.

A common anti-pattern when working with GenServers is putting slow setup code in
the GenServer's `init` function (which is synchronous) causing a delayed start of
the server. One workaround is to send a message to ourselves from the server
and catch it in `handle_info` so that we can do the heavy work asynchronously
and update the state.

In a past project I did it like this with `Process.send_after`:

```elixir
defmodule FrontLine.CameraWorker do
  use GenServer
  require Logger

  @frame_rate 30
  @frame_interval 1000 / @frame_rate |> trunc()
  @img_width 640

  def start_link do
    GenServer.start_link(__MODULE__, [])
  end

  def init([]) do
    Picam.set_size(@img_width, 0)
    Picam.set_hflip(true)

    Process.send_after(self(), :next_frame, @frame_interval)
    {:ok, []}
  end

  def handle_info(:next_frame, state) do
    data = Picam.next_frame() |> Base.encode64()
    UiWeb.Endpoint.broadcast("video:lobby", "next_frame", %{base64_data: data})
    Process.send_after(self(), :next_frame, @frame_interval)
    {:noreply, state}
  end
end
```

To use `handle_continue` you will need to add a `{:continue, _something}` tuple
to the end of your return tuple from `init`. To illustrate an example, let's say
we need to fetch a few records from the database so that we can hydrate our
initial state for the GenServer, we can now do it this way:

```elixir
defmodule MyServer do
  use GenServer

  @impl GenServer
  def init(args) do
    {:ok, args, {:continue, :fetch_records}}
  end

  @impl GenServer
  def handle_continue(:fetch_records, state) do
    new_state = Map.put(state, :records, fetch_records())
    {:noreply, new_state}
  end
end
```

The return type is the same as `handle_cast` and you can even chain multiple
continue operations in a row, for example:


```elixir
defmodule MyServer do
  use GenServer

  @impl GenServer
  def init(args) do
    {:ok, args, {:continue, :fetch_records}}
  end

  @impl GenServer
  def handle_continue(:fetch_records, state) do
    new_state = Map.put(state, :records, fetch_records())
    {:noreply, new_state, {:continue, :compute_meaning_of_life}}
  end

  @impl GenServer
  def handle_continue(:compute_meaning_of_life, state) do
    new_state = Map.put(state, :meaning_of_life, 40 + 2)
    {:noreply, new_state}
  end
end
```

Another overlooked use case is to allow `handle_call` to return a value and do
some async work in the `handle_continue` without making the caller wait:

```elixir
  @impl GenServer
  def handle_call(:compute, _ref, state) do
    IO.puts("in compute")
    {:reply, 42, state, {:continue, :post_compute}}
  end

  @impl GenServer
  def handle_continue(:post_compute, state) do
    IO.puts("in post_compute")
    Process.sleep(1000)
    IO.puts("finished post_compute")
    {:noreply, state}
  end
```

Calling the `:compute` function will return the result immediately and then
perform the `:post_compute` in `handle_continue`.

```
iex(1)> GenServer.call(pid, :compute)
in compute
in post_compute
42
iex(2)>
finished post_compute
```

To read more visit the official documentation here: https://hexdocs.pm/elixir/GenServer.html#c:handle_continue/2
