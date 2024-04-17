// Wrap the input in the div, and remove any whitespace around the input and convert
// the input to lowercase.

let input = "  JavaScript  ";

const trim = (str: string) => str.trim();
const toLowerCase = (str: string) => str.toLowerCase();
const wrapInDiv = (trimmedString: string) => `<div>${trimmedString}</div>`;

const result = wrapInDiv(toLowerCase(trim(input)));

console.log(result); // Output: <div>javascript</div>

