const myLibrary = [];

function updateLibrary() {
  const shelf = document.querySelector(".shelf");
  const books = document.querySelectorAll(".book");
  for (const book of books) {
    book.remove()
  }
  for (const book of myLibrary) {
    const title = document.createElement("h2");
    title.textContent = book.title;
    const author = document.createElement("h3");
    author.textContent = book.author;
    const pageCount = document.createElement("p");
    pageCount.textContent = book.pageCount;
    const status = document.createElement("p");
    status.textContent = book.status ? "Read" : "Unread";
    const entry = document.createElement("div");
    entry.append(title, author, pageCount, status)
    entry.setAttribute("class", "book");
    shelf.appendChild(entry);
  }
}


function Book(title, author, pageCount, status) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.status = status;
}

Book.prototype.info = function () {
  return (`${this.title} by ${this.author}, ${this.pageCount} pages, ` + readStatus())
  function readStatus() { if (this.status) return "read."; else return "not read yet." }
}

function addBookToLibrary(title, author, pageCount, status) {
  myLibrary.push(new Book(title, author, pageCount, status));
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary('1984', 'George Orwell', 368, true);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, false);
addBookToLibrary('Moby-Dick', 'Herman Melville', 720, false);
addBookToLibrary('The Adventures of Huckleberry Finn', 'Mark Twain', 327, true);

console.log(myLibrary[0].info());