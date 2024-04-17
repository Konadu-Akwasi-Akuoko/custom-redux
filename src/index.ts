function sayHello() {
  return "Hello World!";
}

let fn = sayHello;

function greet(fnMessage: () => string) {
  console.log(fnMessage());
}

greet(fn); // Output: Hello World!

function sayHello2() {
  return function () {
    return "Hello World!";
  };
}

let fn2 = sayHello2();

let message = fn2(); // Output: Hello World!

let numbers = [1, 2, 3];

let computedNumbers = numbers.map((num) => num * 2);

console.log(computedNumbers); // Output: [2, 4, 6]