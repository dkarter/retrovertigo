---
slug: make-consolelog-stand-out-with-custom-css-style
date: 2017-10-18 16:32:46Z
title: "Make console.log stand out with custom css style"
tags: javascript
canonicalName: "Hashrocket TIL"
canonicalUrl: https://til.hashrocket.com/posts/4ysah1mugm-make-consolelog-stand-out-with-custom-css-style
---


I know your browser console is full of messages because you are debugging something, and that creates a lot of noise. Now you are adding a new console.log, and you need it to stand out above the rest.

Maybe you are like facebook and just want to warn your users from pasting in code in the browser in social engineering attacks.

![facebook](scYosRC.png)

To style a console.log message use the `%c` interpolation and pass it a css style. e.g. 

```javascript
console.log('%c%s', 'color:red;font-size:5em', alert)
```

In the example above `%s` means inerpolate the object into the output string.

![preview](jNawIEw.png)

Compatibility: tested to work on Firefox, Chrome, and Safari.

h/t [Dillon Hafer](https://til.hashrocket.com/authors/dillonhafer)
