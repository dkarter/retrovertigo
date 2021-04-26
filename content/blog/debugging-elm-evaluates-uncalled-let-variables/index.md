---
slug: debugging-elm-evaluates-uncalled-let-variables
date: 2019-09-20 15:18:29Z
title: "Debugging: Elm evaluates uncalled `let` variables"
tags: elm
canonical: https://til.hashrocket.com/posts/xmoarzzh6l-debugging-elm-evaluates-uncalled-let-variables
---


If you write a function that has a `let` expression variables like so:

```elm
view : Model -> Html Msg
view model =
    let
        logModel = Debug.log "model:" model
    in
      div []
          [ button [ onClick Increment ] [ text "+1" ]
          , div [] [ text <| String.fromInt model.count ]
          , button [ onClick Decrement ] [ text "-1" ]
          ]
```

When the `view` function is called you will see the console log message that `logModel` writes, even though it was never called from the function's body.

This can be useful for debugging function arguments coming in, or other variables without messing with the function's body.

To avoid the `[elm-analyse 97] [W] Unused variable "logModel" ` warning you can use an underscore instead of naming the variable:

```elm
example =
    let
        _ = Debug.log "foo" "bar"
    in
      "function body"
```

It is worth mentioning that variables that are called from a function's body will only be executed once.

```elm
example =
  let
    foo = Debug.log "foo" "I'm called once"
    
    bar = Debug.log "bar" "I'm called once"
  in
  	bar
```

will result in only two console log messages, one for `foo`, and one for `bar`.

h/t [Jeremy Fairbank](https://jeremyfairbank.com/)
