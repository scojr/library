function Book(title, author, pageCount, status) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.status = status;
}
// Properties defined in constructor

Book.prototype.info = function () {
  return (`${this.title} by ${this.author}, ${this.pageCount} pages, ` + readStatus())
  function readStatus() { if (this.status) return "read."; else return "not read yet." }
}
// Methods defined in prototype for efficiency and readability

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);

console.log(theHobbit.info());