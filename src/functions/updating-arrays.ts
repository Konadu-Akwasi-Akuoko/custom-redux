const numbers = [1, 2, 3];

// Adding 
const updatedNumbers = [...numbers, 4, 5, 6];

console.log(updatedNumbers); // Output: [1, 2, 3, 4, 5, 6]

// To add an element at the beginning of the array

const updatedNumbers2 = [0, ...numbers];

console.log(updatedNumbers2); // Output: [0, 1, 2, 3]

// To add an element at a specific index

// First of all we need to find the index of the position where we want to add the element
const index = numbers.indexOf(2);
const updatedNumbers3 = [...numbers.slice(0, index), 4, ...numbers.slice(index)];

console.log(updatedNumbers3); // Output: [1, 4, 2, 3]

// Removing

// To remove the value of 2 from the array
const updatedNumbers4 = numbers.filter((num) => num !== 2);

console.log(updatedNumbers4); // Output: [1, 3]

// Updating

// To update the value of 2 to 20
const updatedNumbers5 = numbers.map((num) => (num === 2 ? 20 : num));

console.log(updatedNumbers5); // Output: [1, 20, 3]

