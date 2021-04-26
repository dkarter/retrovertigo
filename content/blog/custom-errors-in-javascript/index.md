---
slug: custom-errors-in-javascript
date: 2018-04-27 21:48:04Z
title: "Custom errors in JavaScript ⚠️"
tags: javascript
canonicalName: "Hashrocket TIL"
canonicalUrl: https://til.hashrocket.com/posts/s9hur9vygj-custom-errors-in-javascript-
---


Javascript provides the ability to create custom errors by modifying the prototype of a function to the Error protorype. This is how one would create a custom error:

```javascript
function ValidationError(message) { 
  this.name = 'ValidationError'; 
  this.message = message; 
}
ValidationError.prototype = Error.prototype;

// USAGE
throw new ValidationError('the form is invalid');
```

To catch it you can check the class of an error using 
`instanceof`:

```javascript
try {
	// do stuff
  throw new ValidationError('the form is invalid');
} catch (ex) {
	if (ex instanceof ValidationError) {
  	alert(ex.message); // the form is invalid
  } else {
  	// crash and burn
  	throw ex;
  }
}
```

