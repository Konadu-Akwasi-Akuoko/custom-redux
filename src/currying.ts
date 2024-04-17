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
