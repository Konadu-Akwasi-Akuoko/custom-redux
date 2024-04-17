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
