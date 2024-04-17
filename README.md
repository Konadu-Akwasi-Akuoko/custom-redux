# Building Our Own Custom Redux

This is a simple implementation of the popular Javascript Library called [Redux](https://redux.js.org/). This implementation is a simplified version of the original Redux library. It is a simple implementation that is meant to help you understand how Redux works under the hood.

This repo is a simplified version of the video [Redux Tutorial - Learn Redux from Scratch](https://www.youtube.com/watch?v=poQXNp9ItL4) by Mosh. If you want the video tutorial you can check out his video.

As beginner to the Redux design pattern we need to start understanding some basic concepts before we build our own custom redux library.

## Why build our own custom Redux library?

Building our own custom Redux library will **help us understand how Redux works under the hood.** It will help us understand the basic concepts of Redux and how to implement them in a real-world application. We will start by understanding all the concepts and design patterns that makes up Redux.

## Table of Contents

1. [Functional Programming](#functional-programming)
2. [Fundamentals of Redux](#fundamentals-of-redux)
3. [Building Our Own Custom Redux](#building-our-own-custom-redux)
4. [Debugging Redux Applications](#debugging-redux-applications)

## Functional Programming

In functional programming we create functions that are pure and do not have side effects. A pure function is a function that given the same input will always return the same output. It does not depend on any external state or variable. It does not modify any external state or variable. It does not have any side effects.

So basically we build small pure functions that are composable. We can take these small functions and compose them together to build more complex functions. This is the basic idea behind functional programming.

### Functions as first class citizens

When we say a function is a first class citizen, it means that we can treat functions like any other variable. We can pass functions as arguments to other functions. We can return functions from other functions. We can assign functions to variables. Take a look at the below code:

```Typescript
function sayHello() {
  return "Hello World!";
}

let fn = sayHello;

console.log(fn()); // Hello World!
```

In the above code, we have a function called `sayHello`. We then assign the function to a variable called `fn`. Note that we didn't call the function `sayHello` using the parenthesis `()`. We just assigned the function to the variable `fn`. We can then call the function using the variable `fn`.

Now let's take a look at another example:

```Typescript
function sayHello() {
  return "Hello World!";
}

let fn = sayHello;

function greet(fnMessage : () => string) {
  console.log(fnMessage());
}

greet(fn); // Output: Hello World!
```

In the above code, we have a function called `greet` that takes a function as an argument. We can pass the `sayHello` function to the `greet` function. This is what we mean by functions as first class citizens. Thus we can pass functions as arguments to other functions, return functions from other functions and assign functions to variables.

Now let's see how we can return a function from another function:

```Typescript
function sayHello2() {
  return function () {
    return "Hello World!";
  };
}

let fn2 = sayHello2();

let message = fn2(); // Output: Hello World!
```

From the above code, we have a function called `sayHello2` that returns another function. We can call the `sayHello2` function and assign the returned function to a variable called `fn2`. We can then call the `fn2` function to get the message `Hello World!`. And this is a powerful technique in functional programming, returning function from other functions.

### Higher Order Functions

Higher order functions are functions that take other functions as arguments or return functions as their results. We have seen examples of higher order functions in the previous examples. Let's take a look at another example:

```Typescript
function sayHello() {
  return "Hello World!";
}

function greet(fnMessage : () => string) {
  console.log(fnMessage());
}

greet(sayHello); // Output: Hello World!
```

In the above code, the `greet` function is a higher order function because it takes another function as an argument. We can pass the `sayHello` function to the `greet` function. This is what we mean by higher order functions. Functions that return or take other functions as arguments, and operate on them.

In Javascript, there are a couple of higher order functions, that take other functions as arguments. Some of these higher order functions are `map`, `filter`, `reduce`, `forEach`, `find`, `every`, `some`, `sort`, `setTimeout`, `setInterval`, etc. Here is an example of a higher order function:

```typescript
let numbers = [1, 2, 3];

let computedNumbers = numbers.map((num) => num * 2);

console.log(computedNumbers); // Output: [2, 4, 6]
```

From the above code, we have an array of numbers `[1, 2, 3]`. We then use the `map` higher order function to multiply each number by 2. The `map` function takes a function as an argument and applies the function to each element in the array. The `map` function then returns a new array with the computed values.

### Function Composition

An ideal functional program is a program that consist of small pure functions that are composed together to build more complex functions. Function composition is the process of combining two or more functions to produce a new function. We can take the output of one function and pass it as the input to another function. This is what we mean by function composition.

Take a look at the following code:

```typescript
// Wrap the input in the div, and remove any whitespace around the input.

let input = "  JavaScript  ";

const trim = (str: string) => str.trim();

const wrapInDiv = (trimmedString: string) => `<div>${trimmedString}</div>`;

const result = wrapInDiv(trim(input));

console.log(result); // Output: <div>JavaScript</div>
```

In the above code, we have two functions `trim` and `wrapInDiv`. The `trim` function removes any whitespace around the input string. The `wrapInDiv` function wraps the input string in a div tag. We can compose these two functions together to build a more complex function. We can take the output of the `trim` function and pass it as the input to the `wrapInDiv` function.

So this is what we call function composition. We can take small pure functions and compose them together to build more complex functions. Let's take a look at another example:

```typescript
// Wrap the input in the div, and remove any whitespace around the input and convert
// the input to lowercase.

let input = "  JavaScript  ";

const trim = (str: string) => str.trim();
const toLowerCase = (str: string) => str.toLowerCase();
const wrapInDiv = (trimmedString: string) => `<div>${trimmedString}</div>`;

const result = wrapInDiv(toLowerCase(trim(input)));

console.log(result); // Output: <div>javascript</div>
```

In the above code, we have three functions `trim`, `toLowerCase` and `wrapInDiv`. We can compose these three functions together to build a more complex function. We can take the output of the `trim` function and pass it as the input to the `toLowerCase` function. We can then take the output of the `toLowerCase` function and pass it as the input to the `wrapInDiv` function. In this case when reading the code, we need to read it from right to left. We first trim the input, then convert it to lowercase and finally wrap it in a div tag.

### Composing and Piping Functions

In the previous examples we took a look at function composition. But we say that sometimes it get's hard to read the code when we compose functions together. We can use a technique called composing and piping functions to make the code more readable. With this we will use a package called lodash. This package provides a couple of functions that we can use to compose and pipe functions. Let's take a look at how we can use the compose function in `lodash/fp` to make our code more readable:

```typescript
// Wrap the input in the div, and remove any whitespace around the input and convert
// the input to lowercase.

import { compose, pipe } from "lodash/fp";

let input = "  JavaScript  ";

const trim = (str: string) => str.trim();
const toLowerCase = (str: string) => str.toLowerCase();
const wrapInDiv = (trimmedString: string) => `<div>${trimmedString}</div>`;

const transform = compose(wrapInDiv, toLowerCase, trim);

const result = transform(input);

console.log(result);
```

In the above code, we import the `compose` function from `lodash/fp`. We then compose the three functions `wrapInDiv`, `toLowerCase` and `trim` together to build a new function called `transform`. We can then call the `transform` function with the input string. This makes the code more readable and easier to understand. But remember we are still composing the functions from right to left.

We can use the `pipe` function to compose the functions from left to right. Let's take a look at how we can use the `pipe` function to compose the functions from left to right:

```typescript
// Wrap the input in the div, and remove any whitespace around the input and convert
// the input to lowercase.

import { compose, pipe } from "lodash/fp";

let input = "  JavaScript  ";

const trim = (str: string) => str.trim();
const toLowerCase = (str: string) => str.toLowerCase();
const wrapInDiv = (trimmedString: string) => `<div>${trimmedString}</div>`;

const transform = compose(wrapInDiv, toLowerCase, trim);

const transform2 = pipe(trim, toLowerCase, wrapInDiv);

const result = transform(input);
const result2 = transform2(input);

console.log(result); // Output: <div>javascript</div>
console.log(result2); // Output: <div>javascript</div>
```

In the above code, we import the `pipe` function from `lodash/fp`. We then compose the three functions `trim`, `toLowerCase` and `wrapInDiv` together to build a new function called `transform2`. We can then call the `transform2` function with the input string. This makes the code more readable and easier to understand. But remember we are now composing the functions from left to right, as if we are reading. So we first trim the input, then convert it to lowercase and finally wrap it in a div tag.

### Currying


