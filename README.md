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

Currying in functional programming is a process in which a function with multiple arguments is transformed into a sequence of functions, each with a single argument.

For example, let's say we have a function that adds two numbers:

```javascript
function add(a, b) {
  return a + b;
}
```

We can call this function with two arguments like this: `add(1, 2)`, and it will return `3`.

Now, let's curry this function:

```javascript
function curryAdd(a) {
  return function(b) {
    return a + b;
  }
}
```

Now, we can call the curried function like this: `curryAdd(1)(2)`, and it will also return `3`.

The benefit of currying is that it allows you to create new functions by partially applying some arguments to the original function. For example, we can create a new function that adds 5 to its argument:

```javascript
const addFive = curryAdd(5);
console.log(addFive(10)); // Outputs: 15
```

In this example, `addFive` is a new function that we created by partially applying the argument `5` to the `curryAdd` function. Now, `addFive(10)` is equivalent to `curryAdd(5)(10)`. This is a powerful technique that can make your code more flexible and reusable. It's widely used in functional programming and in JavaScript libraries such as Ramda and Lodash.

Let's take a look at anoher example:

```typescript
// Wrap the input in the div, and remove any whitespace around the input and convert
// the input to lowercase.

import { compose, pipe } from "lodash/fp";

let input = "  JavaScript  ";

const trim = (str: string) => str.trim();
const toLowerCase = (str: string) => str.toLowerCase();

//  To combine these two functions into one function we can do the following:
const wrapInDiv = (trimmedString: string) => `<div>${trimmedString}</div>`;
const wrapInSpan = (trimmedString: string) => `<span>${trimmedString}</span>`;

// The below function has combined the wrapInDiv and wrapInSpan functions into one function,
// which can be used to wrap the input in either a div or a span. But when using the pipe function
// we can only pass one argument to the function, so we need to create a new function that takes
// the tag as an argument and returns a new function that takes the trimmedString as an argument.
// This is called currying.
const wrapCombined = (tag: string, trimmedString: string) =>
  `<${tag}>${trimmedString}</${tag}>`;

// Rather than the above function, we can create a curried function that takes the tag as an argument
// and returns a new function that takes the trimmedString as an argument.
const wrap = (tag: string) => (trimmedString: string) =>
  `<${tag}>${trimmedString}</${tag}>`;

// So over here, we have created a curried function that takes the tag as an argument and returns a new function
// that takes the trimmedString as an argument. This is called currying.
const transform = pipe(trim, toLowerCase, wrap("div"));

const result = transform(input);

console.log(result); // Output: <div>javascript</div>
```

In the above code, we have a function called `wrap` that takes the tag as an argument and returns a new function that takes the trimmed string as an argument. We can then use the `wrap` function to create new functions that wrap the input string in different tags. This makes the code more flexible and reusable. So to call this wrap function we can do the following:

```typescript
cont result = wrap("div")("JavaScript"); //Output: <div>JavaScript</div>
```

So we first pass in `div` as the wrap function's argument, and because the function is curried, it returns a new function that also takes/expects a string as an argument. We can then call this new function with the input string `JavaScript`.

### Pure functions

A pure function is a function that given the same input will always return the same output. It does not depend on any external state or variable. It does not modify any external state or variable. It does not have any side effects. There is also no mutation of parameters or variables. Pure functions are predictable and easy to test. They are also composable and can be used to build more complex functions. Pure functions a re self-documenting and easy to understand. Take a look at this example:

```typescript
function add(a: number, b: number): boolean {
  return a > b;
}

console.log(add(1, 2)); // false

```

The above function is a pure function. It takes two numbers as input and returns the sum of the two numbers. It does not depend on any external state or variable. It does not modify any external state or variable. It does not have any side effects. It is a pure function.

Now what if we don't use pure functions, and rather we compare the value with an external variable:

```typescript
let a = 10;

function add(b: number): boolean {
  return a > b;
}

console.log(add(5)); // Output: true
```

Although the function is working as we intended, but the moment we change the value of `a` the function will return a different value. This is because the function depends on an external state or variable. It is not a pure function. It is not predictable and can have side effects. One benefit of pure functions is that it is also cashable. We can cache the result of a pure function and reuse it later. This can help improve the performance of our application.

### Immutability

Immutability simply means that once you create an object/data that data cannot be changed. If you want to change you need to copy it first and change that copy. This is a fundamental concept in functional programming. It makes our code more predictable and easier to understand. It also helps us avoid bugs and side effects. Let's take a look at an example of a direct mutation:

```typescript
let person = { name: "John", age: 30 };

// We can change the age of the person object like this:
person.age = 40;

console.log(person); // Output: { name: "John", age: 40 }
```

In the above code, we have an object called `person` with two properties `name` and `age`. We can change the `age` property of the `person` object directly. This is called mutation. It is not recommended in functional programming. Instead, we should create a new object with the updated properties. Let's take a look at how we can do this:

```typescript
let person = { name: "John", age: 30 };

// We can change the age of the person object like this:
let newPerson = { ...person, age: 40 };

console.log(person); // Output: { name: "John", age: 30 }
console.log(newPerson); // Output: { name: "John", age: 40 }
```

In the above code, we have an object called `person` with two properties `name` and `age`. We can create a new object called `newPerson` with the updated `age` property. We use the spread operator `...` to copy all the properties of the `person` object to the `newPerson` object. We then update the `age` property of the `newPerson` object. This is how we can achieve immutability in Javascript.

> A common misconception about the const keyword: The const keyword in Javascript does not make the object immutable. It only makes the reference to the object immutable. This means that you cannot reassign the variable to a new object. But you can still change the properties of the object, thus you can assign `person.age` to a different value and that will still work. So the const keyword does not guarantee immutability.

So the bottom line here is, when building applications in Redux, you should not mutate data, because this is a fundamental principle in redux. You should always create new objects with the updated properties. This will make your code more predictable and easier to understand.

One problem with copying objects into new objects is shallowing copying. This means that if we have nested data, and we use the spread operator to copy the object into a new updated object, and we directly mutate the nested data, both the original object and the new object will be affected. This is because the spread operator only does a shallow copy. Take a look at this example:

```typescript
const person = {
  name: "John",
  address: {
    city: "New York",
    country: "USA",
  },
};

console.log(person);

// Output:
// {
//   name: 'John',
//   address: { city: 'New York', country: 'USA' }
// }

// Now let's do a shallow copy
const updated = {
  ...person,
  name: "Bob",
};

// Now let's change the address of the updated address city's to "Chicago"
updated.address.city = "Chicago";

console.log(updated);
// Output:
// {
//   name: 'Bob',
//   address: { city: 'Chicago', country: 'USA' }
// }

// Now let's also log the original person object
console.log(person);

// Output:
// {
//   name: 'John',
//   address: { city: 'Chicago', country: 'USA' }
// }
```

From the above code we clearly see that the original person object is also affected when we change the address of the updated object. This is because the spread operator only does a shallow copy. It does not do a deep copy. To solve this problem, we need to also reassign the nested object. We can use the spread operator to copy the nested object into a new object. This is how we can achieve deep copying. Take a look at this example:

```typescript
const person = {
  name: "John",
  address: {
    city: "New York",
    country: "USA",
  },
};

console.log(person);

// Output:
// {
//   name: 'John',
//   address: { city: 'New York', country: 'USA' }
// }

// Now let's do a deep copy

const updated = {
  ...person,
  address: {
    ...person.address,
  },
};

// Now let's change the address of the updated address city's to "Chicago"

updated.address.city = "Chicago";

console.log(updated);

// Output:
// {
//   name: 'John',
//   address: { city: 'Chicago', country: 'USA' }
// }

// Now let's also log the original person object
console.log(person);

// Output:
// {
//   name: 'John',
//   address: { city: 'New York', country: 'USA' }
// }
```

So you see, by copying the nested object into a new object, we can achieve deep copying. This will make sure that the original object is not affected when we change the nested object. This is how we can avoid shallow copying in Javascript. But this approach can be cumbersome and error-prone. There are libraries like `immer` that can help us achieve deep copying in a more elegant way.

### Updating Arrays

There are many ways we can update arrays immutably, take a look at the following examples:

```typescript
const numbers = [1, 2, 3];

// Adding 
const updatedNumbers = [...numbers, 4, 5, 6];

console.log(updatedNumbers); // Output: [1, 2, 3, 4, 5, 6]

// To add an element at the beginning of the array

const updatedNumbers2 = [0, ...numbers];

console.log(updatedNumbers2); // Output: [0, 1, 2, 3]

// To add an element at a specific index

// First of all we need to find the index of the value where we want to add the element
const index = numbers.indexOf(2);
const updatedNumbers3 = [...numbers.slice(0, index), 4, ...numbers.slice(index-1)];

console.log(updatedNumbers3); // Output: [1, 4, 3]
```

Note that the `slice` method does not mutate the original array, but rather returns a new array. But that new array is a shallow copy of the original array. This means that if the array contains objects or arrays, then the original and the copied will share the same objects or arrays.

From the above code, we have an array of numbers `[1, 2, 3]`. We can add elements to the array by using the spread operator `...`. We can add elements at the beginning of the array, at the end of the array, or at a specific index in the array. To add a value at a specific index, we first find the index of the value where we want to add the element, and store it inside a variable. We then use the `slice` method to split the array into two parts, first of all we start at index 0 and end at the index where we want to insert the new value. Note that the second parameter of the `slice` method is not inclusive, but rather exclusive. We then use the `slice` method again to get the second part of the array starting from the index which we stored. We then spread the two slices of the array into a new array. This is because the `slice` method does not mutate the original array, but rather returns a new array, so we need to spread the two slices into a new array.

To also delete a value, say `2` from the array, we can do the following:

```typescript
const updatedNumbers4 = numbers.filter((n) => n !== 2);

console.log(updatedNumbers4); // Output: [1, 3]
```

This will return a new array with all the values that are not equal to `2`. This is how we can delete a value from an array immutably.

To also update a value in an array, say we want to update the value `2` to `20`, we can do the following:

```typescript
const updatedNumbers5 = numbers.map((n) => (n === 2 ? 20 : n));

console.log(updatedNumbers5); // Output: [1, 20, 3]
```

This will return a new array with all the values that are not equal to `2` as they are, but the value that is equal to `2` will be updated to `20`. This is because the `map` method accepts a function that takes each element of the array and returns a new value. In this case, we check if the element is equal to `2`, we return `20`, otherwise we return the element as it is.

### Enforcing Immutability

Although javascript supports the functional way of building applications, it does not enforce immutability. This means that you can still mutate data in javascript. But there are libraries that can help us enforce immutability. One of such libraries is `immutable.js` and `immer`.

### Immutable.js

Immutable.js is a library that provides immutable data structures for javascript. It provides a set of immutable data structures that can help us enforce immutability in our applications. It provides List, Map, Set, Stack, OrderedMap, OrderedSet, Record, Range, Repeat, Seq, Collection, and Iterable. These data structures are immutable and can help us build applications in a more functional way. Let's take a look at an example of how we can use the List data structure in Immutable.js:

```typescript
import Immutable, { Map } from "immutable";

let book = Map({ title: "Harry Potter" });

function publish(book: Immutable.Map<any, any>) {
  return book.set("isPublished", true);
}

const newBook = publish(book);

console.log(book.toJS()); // Output: { title: 'Harry Potter' }
console.log(newBook!.toJS()); // Output: { title: 'Harry Potter', isPublished: true }
```

In the above code, we import the `Map` data structure from `immutable`. We then create a new `Map` object called `book` with a title property. We then create a function called `publish` that takes a `Map` object as an argument and returns a new `Map` object with the `isPublished` property set to `true`. We then call the `publish` function with the `book` object and store the result in a new variable called `newBook`. We then log the `book` object and the `newBook` object to the console. We can see that the `book` object is not mutated, but rather a new `Map` object is created with the `isPublished` property set to `true`. This is how we can enforce immutability in our applications using `immutable.js`.

### Immer

Immer is a library that provides a simple and effective way to work with immutable data in javascript. It allows us to write code that looks like it is mutating data, but under the hood, it is creating a new copy of the data. This makes our code more readable and easier to understand. Let's take a look at an example of how we can use Immer to work with immutable data:

```typescript
import { produce } from "immer";

let book = { title: "Harry Potter" };

function publish(book: any) {
  return produce(book, (draftBook : any) => {
    draftBook.isPublished = true;
  });
}

const newBook = publish(book);

console.log(book); // Output: { title: 'Harry Potter' }
console.log(newBook); // Output: { title: 'Harry Potter', isPublished: true }
```

In the above code, we import the `produce` function from `immer`. We then create a new object called `book` with a title property. We then create a function called `publish` that takes an object as an argument and returns a new object with the `isPublished` property set to `true`. We use the `produce` function to create a new object based on the `book` object. We then update the `draftBook` object inside the `produce` function. We then log the `book` object and the `newBook` object to the console. We can see that the `book` object is not mutated, but rather a new object is created with the `isPublished` property set to `true`. This is how we can work with immutable data in javascript using `immer`.

## Redux

Now after understanding all the basics of functional programming, we can now dive into Redux. Redux is a predictable state container for javascript applications. It helps us manage the state of our application in a predictable way. It is based on these principles or architectures:

- Single source of truth (store): The state of the whole application is stored in an object tree within a single store. This makes it easier to debug and inspect the state of the application. So this means that all data inside our application is stored inside a single object called the store. We can not directly mutate or change the state of the store, because redux is built on the fundamental principle of immutability(functional programming). So this means that we cannot write code like this:
  
  ```Typescript
  store.currentUser = { name: "John", age: 30 };
  ```
  
  In the above code we are directly mutating the value of the `currentUser` which is found in the store, and this is not allowed in redux. So to update the store we will need to write a function that will take the current state of the store and return an updated store with updated values.

- A function to compute the new state of the store (reducer): So in that function that we will write we need to use the spread operator to copy the current state of the store into a new object, and then update the values of the new object. Or we can use libraries like `immer` to help us update the store in a more elegant way. So this function that we write is called a **`reducer`** function.

  The term "reducer" comes from the concept of a **reduce function** in functional programming. A reduce function in functional programming is used to reduce a collection of values down to a single value.

  In Redux, a **reducer** function serves a similar purpose. It takes the current state and an action, and then returns a new state, effectively reducing the state and action into a new state. It's like it's "reducing" the complexity of state management by providing a predictable way to handle state changes.
  
  So, the name "reducer" in Redux is inspired by the reduce function in functional programming. It's a way of describing a function that takes a collection of values (the current state and an action), and reduces them down to a single value (the new state). This aligns with the principles of immutability and pure functions, which are core concepts in Redux. Here is an example of how a reducer function looks like:

  ```typescript
  function reducer(store) {
    const update =  { ...store };
    return update;
  }
  ```

  In the above code, we have a function called `reducer` that takes the current state of the store as an argument. We then copy the current state of the store into a new object called `update`. We then return the `update` object.
  
- What to update (actions): But the question is, if we want to update a part of the store, how will the reducer function know which part of the store to update? This is where **`actions`** come in.

  So basically an action will tell the reducer function what part of the plain object store to update. Now based on the action the reducer function will know which part of the store to update. The action is an object containing 2 values, the `type` and the `payload` This is how an action looks like:

  ```typescript
  const action = {
    type: "UPDATE_USER",
    payload: { name: "John", age: 30 },
  };

  function reducer(store, action) {
    switch (action.type) {
      case "UPDATE_USER":
        return { ...store, user: action.payload };
      default:
        return store;
    }
  }
  ```

  From the above code you saw that the action is also a javascript object, that contains the `type` of action and the `payload`. The `type` of action is a string that describes the action that we want to perform. The `payload` is the data that we want to update in the store (the new data). So in the reducer function we use a `switch` statement to check the `type` of action. If the `type` of action is `UPDATE_USER`, we update the `user` property of the store with the `payload` data. If the `type` of action is not `UPDATE_USER`, we return the current state of the store.

Now from the above we now know 3 basic concepts in Redux. First of all we have the store, which is a plain object that contains all the data of our application. Secondly we have the reducer function, which is a function that takes the current state of the store and an action, and computes a new state based on the action that we want to perform. And lastly we have the action, which is an object that describes the action that we want to perform and the data that we want to update in the store (type and payload).

Now how do all these building blocks work together?

1. Updating the store or the state in Redux always starts with an action. You will need to dispatch an action to update the store. The action is an object that describes the action that we want to perform and the data that we want to update in the store (type and payload).
2. The store takes in the action and the current state of the store and passes it to the reducer function.
3. The reducer function then computes a new state based on the action that we want to perform. The reducer function then returns the new state of the store.
4. The store then updates the state of the store with the new state, thus replaces the old state with the new state of the store. This is how all the building blocks work together in Redux.

Now the question is why don't we call the reducer function, but rather dispatch an action to the store and the store calls the reducer function for us? This is because the store is a single source of truth. It is the only place where we can update the state of the store. This makes it easier to debug and inspect the state of the application. This is why we dispatch an action to the store and the store calls the reducer function for us.

### Redux Store

Now let's build our own redux store. We will build a simple bug tracking redux store that will have the following features:

1. Add a bug.
2. Remove a bug.
3. Resolve a bug.
4. Set a bug to in progress.

Let's start listing the steps to create our redux store:

- Design the store.
- Design the actions.
- Create a reducer function.
- Set up the store.

### Designing the store

In a simple bug tracking app, we can use this structure as a store:

```typescript
{
  bugs: [
    { id: 1, description: "Bug 1", resolved: false },
    { id: 2, description: "Bug 2", resolved: false },
    { id: 3, description: "Bug 3", resolved: false },
  ];
  currentUser : {}
}
```

From the above store, we have a `bugs` property that is an array of bugs. Each bug has an `id`, `description`, and `resolved` property. We also have a `currentUser` property that is an object that contains the current user of the application, which we will set the currentUser when the user logs in.

Now let's introduce a new terminology called a `slice`. A slice is a part of the store that contains a specific part of the state. In our store, we have two slices, the `bugs` slice and the `currentUser` slice. Each slice contains a specific part of the state of the application. So we can say that in an object tree a slice is one level down in the tree.

### Defining the actions

Now the question is what are some of the actions that we can perform in our bug tracking app? We can have the following actions:

- Add a Bug
- Mark as Resolved
- Delete a Bug

So an action is just a plain javascript object that defines what has happened in the application. It has a `type` property that describes the action that we want to perform and a `payload` property that contains the data that we want to update in the store. So let's define the actions that we can perform in our bug tracking app:

```typescript
{
  type: "ADD_BUG",
  payload: { id: 1, description: "Bug 1" , resolved: false }
}

{
  type : "REMOVE_BUG",
  payload: { id: 1 }
}

{
  type: "RESOLVE_BUG",
  payload: { id: 1 }
}
```

From the above code we have defined three actions that we can perform in our bug tracking app. We have the `ADD_BUG` action that adds a bug to the store. We have the `REMOVE_BUG` action that removes a bug from the store. We have the `RESOLVE_BUG` action that marks a bug as resolved in the store. Each action has a `type` property that describes the action that we want to perform and a `payload` property that contains the data that we want to update or add in the store.

### Creating a Reducer

Now as we said earlier, a reducer is a function that takes in 2 arguments, the current state of the store and an action, and then returns a new state based on the action that we want to perform. So let's create a reducer function that will take in the current state of the store and an action, and then return a new state based on the action that we want to perform:

```typescript
export function reducer(state: any, action: { type: string; payload: any }) {
  switch (action.type) {
    case "ADD_BUG":
      return [...state, action.payload];
    case "REMOVE_BUG":
      return state.filter((bug: any) => bug.id !== action.payload.id);
    case "RESOLVE_BUG":
      return state.map((bug: any) =>
        bug.id === action.payload.id ? { ...bug, resolved: true } : bug
      );
    default:
      return state;
  }
}
```

From the above code, we have created a reducer function that takes in the current state of the store and an action. We then use a `switch` statement to check the `type` of action.

- If the `type` of action is `ADD_BUG`, we add a new bug to the store. We use the spread operator `...` to copy the current state of the store into a new array and then add the new bug to the array.
- If the `type` of action is `REMOVE_BUG`, we remove a bug from the store. We use the `filter` method to filter out the bug that we want to remove from the store. Remember the filter method does not mutate the original array, but rather returns a new array. But this methods does a shallow copy, so if the array contains objects or arrays, then the original and the copied will share the same reference address of the objects or arrays.
- If the `type` of action is `RESOLVE_BUG`, we mark a bug as resolved in the store. We use the `map` method to map over the array of bugs and then update the bug that we want to mark as resolved. If we find a value that matches the id of the bug that we want to mark as resolved, we copy the bug into a new object and then update the `resolved` property of the bug to `true`. If the value does not match the id of the bug that we want to mark as resolved, we return the bug as it is.

Now note that the reducer function will be called by the store, in it's instantiating, so we will need to provide the initial state of the store in the reducer. So let's provide the initial state of the store in the reducer function:

```typescript
export function reducer(state: any = [], action: { type: string; payload: any }) {
  switch (action.type) {
    case "ADD_BUG":
      return [...state, action.payload];
    case "REMOVE_BUG":
      return state.filter((bug: any) => bug.id !== action.payload.id);
    case "RESOLVE_BUG":
      return state.map((bug: any) =>
        bug.id === action.payload.id ? { ...bug, resolved: true } : bug
      );
    default:
      return state;
  }
}
```

From the above code, we have provided the initial state of the store as an empty array `[]`. This is the initial state of the store. When the store is instantiated, the reducer function will be called with the initial state of the store and an action. If the state is not provided, the reducer function will use the initial state of the store as an empty array `[]`.

### Creating the Store


