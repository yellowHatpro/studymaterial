## Higher Order Functions

A higher order function is a function that takes a function as an argument, or returns a function.

### Example Use-cases of Functions That Modify Functions

Functions that modify or extends the behavior of functions are extremely common in JavaScript and are a key concept in [functional programming](https://en.wikipedia.org/wiki/Functional_programming). It is critical to fully understand them to be an effective developer.

They are very useful for writing elegant, reusable code, and have a variety of use-cases, a few of which will be discussed.

### Throttle

Imagine you were implementing a search field. Querying the database for results every single time a character is typed could put unnecessary load on the database and the user interface. To prevent this, you could employ a technique known as throttling. By [throttling](https://lodash.com/docs/4.17.15#throttle) the function responsible for sending requests to the database, we ensure that only a limited number of requests are sent per second, thereby optimizing system performance.

### Memoize

A common optimization is to never call a [pure function](https://en.wikipedia.org/wiki/Pure_function) with the same inputs twice. Instead you can avoid the computation by just returning the previously cached result. This is also an important concept in dynamic programming. Benefitting from this optimization could be as simple calling `memoize()` on the function. [memoizee](https://www.npmjs.com/package/memoizee) is popular package for this.

### Time Limit

Suppose you have a long running process that repeats itself (like syncing data from a database to an in-memory cache). If for some reason, an asynchronous function never returns a value (or takes a very long time), that process will become frozen. To guarantee that never happens, you could wrap the asynchronous functions used with time limits.

## Syntax Required for Transforming Functions

### Ret Syntax

In JavaScript, you can access all passed arguments as an array using **_rest_** syntax. You can then **_spread_** the array of arguments and pass them back into a function.

```javascript
function sum(...nums) {
  let sum = 0;
  for (const num of nums) {
    sum += num;
  }
  return sum;
}
sum(1, 2, 3); // 6
```

In the above example, the variable nums is `[1, 2, 3]`.

But more importantly, you can use this syntax to transform arbitrary functions.

```javascript
function withLogging(fn) {
  return function (...args) {
    console.log("Arguments", args);
    const result = fn(...args);
    console.log("Result", result);
    return result;
  };
}
const add = withLogging((a, b) => a + b);
add(1, 2); // Logs: Arguments [1, 2] Result 3
```

In this example, all the arguments, no matter what they are or how many, will be passed to `fn`.

## Argument Syntax

If you use `function` syntax (not arrow function), you have access to the `arguments` variable.

```javascript
function sum() {
  let sum = 0;
  for (const num of arguments) {
    sum += num;
  }
  return num;
}
sum(1, 2, 3); // 6
```

`arguments` is a special iterable value bound to the function. It's good to understand for reading older codebases, however is has been largely replaced with rest syntax. One reason for this is that it can lead to confusion when you don't document the input values upfront. This is especially problematic if you want to annotate your functions with TypeScript.
