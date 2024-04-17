import Immutable, { Map } from "immutable";

let book = Map({ title: "Harry Potter" });

function publish(book: Immutable.Map<any, any>) {
  return book.set("isPublished", true);
}

const newBook = publish(book);

console.log(book.toJS()); // Output: { title: 'Harry Potter' }
console.log(newBook!.toJS()); // Output: { title: 'Harry Potter', isPublished: true }
