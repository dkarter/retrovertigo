---
slug: borrowing-in-rust
date: 2022-01-27
title: "Borrowing in Rust"
tag: rust
---

In Rust when you pass a variable to a function it is technically "moved". That means the the caller looses ownership of the variable and can no longer read or modify it. When the other function finishes running it will take care of freeing up the memory used by the variable. For example:

```rust
fn main() {
    let singular = String::from("book");
    let plural = pluralize(singular);

    println!("The plural of {} is {}", singular, plural);
}

fn pluralize(singular: String) -> String {
    singular + "s"
}
```

The code above will produce the following error:

```
error[E0382]: borrow of moved value: `singular`
 --> src/main.rs:5:48
  |
2 |     let singular = String::from("book");
  |         -------- move occurs because `singular` has type `String`, which does not implement the `Copy` trait
3 |     let plural = pluralize(singular);
  |                            -------- value moved here
4 |
5 |     println!("The plural of {} is {}", singular, plural);
  |                                        ^^^^^^^^ value borrowed here after move
```

What the Rust compiler is trying to tell us here is that `singular`'s ownership
was passed to `pluralize`, and therefore cannot be accessed anymore by `main`.
When `pluralize` finishes running, the memory allocated to store `singular` will
be freed automatically.

One solution is to clone the variable:

```rust
fn main() {
    let singular = String::from("book");
    let plural = pluralize(singular.clone());

    println!("The plural of {} is {}", singular, plural);
}

fn pluralize(singular: String) -> String {
    singular + "s"
}
```

However this solution has a downside of using more memory, and in cases where we
are dealing with structs with lots of information this can hurt performance.

Rust solves this with the idea of Borrowing. With borrowing you can pass the
variable to your function to use, but the caller is still responsible for the
cleanup and ultimately "owns" that piece of memory allocation. This may seem
similar to pointers in C / C++ but the difference is that with borrowing, the
rust compiler is able to check your code at *compile time* and ensure the
reference would never be invalid (pointing to nothing / invalid memory). T

Let's update our previous example to use borrowing:


```rust
fn main() {
    let singular = String::from("book");
    let plural = pluralize(&singular);

    println!("The plural of {} is {}", singular, plural);
}

fn pluralize(singular: &str) -> String {
    singular.to_owned() + "s"
}
```

Notice what changed:
1. Added an `&` when passing `singular` to `pluralize`, this signifies that we
   are passing a borrowed string slice to `pluralize`.
2. Changed the type of `singular` argument to a string slice `&str`.
3. Finally, since concatenation requires a resize/reallocation of the memory
   slot storing `singular` we call `to_owned()` on the string slice before
   appending `"s"`.

Technically we didn't save an allocation in this case since we needed to return
a concatenated copy, but this won't always be the case (sometimes all the
function needs to do is read the value..).

### In Sum
Borrowing reduces allocations which helps improve both memory usage and improve
runtime performance. It is consider a more idiomatic way of passing values to
functions if they are still need to be read/modified in the caller after the
function has been called.

Finally, Rust's compiler is able to use this feature to ensure that references
are always valid, preventing an entire class of errors which are hard to debug
and are often only discovered during runtime in many languages.
