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
