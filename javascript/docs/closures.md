## Closures

In JavaScript, functions have a reference to all variables declared in the same scope as well as any outer scopes. These scopes are known as the function's **lexical environment**. The combination of the function and it's environment is known as a **closure**.

### Closure Example

In Javascript, you can declare functions within other functions and return them. The inner function has access to any variables declared above it.

```javascript
function createAdder(a) {
  return function add(b) {
    const sum = a + b;
    return sum;
  };
}
const addTo2 = createAdder(2);
addTo2(5); // 7
```

The inner function `add` has access to `a`. This allows the outer function to serve as a factory of new functions, each with different behavior.

### Closures Versus Classes

You may notice that in the above example `createAdder` is very similar to a class constructor.

```javascript
class Adder {
  constructor(a) {
    this.a = a;
  }

  add(b) {
    const sum = this.a + b;
    return sum;
  }
}
const addTo2 = new Adder(2);
addTo2.add(5); // 7
```

Besides differences in syntax, both code examples essentially serve the same purpose. They both allow you to pass in some state in a "constructor" and have "methods" that access this state.

One key difference is that closures allow for true encapsulation. In the class example, there is nothing stopping you from writing `addTo2.a = 3;` and breaking it's expected behavior. However, in the closure example, it is theoretically impossible to access `a`. Note that as of 2022, true encapsulation is achievable in classes with [# prefix syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields).

Another difference is how the functions are stored in memory. If you create many instances of a class, each instance stores a single reference to the **prototype object** where all the methods are stored. Whereas for closures, all the "methods" are generated and a "copy" of each is stored in memory each time the outer function is called. For this reason, classes can be more efficient, particularly in the case where there are many methods.

Unlike in languages like Java, you will tend to see code written with functions rather than with classes. But since JavaScript is a multi-paradigm language, it will depend on the particular project you are working on.
