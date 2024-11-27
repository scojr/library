const myLibrary = [];

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary('1984', 'George Orwell', 368, true);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, false);
addBookToLibrary('Moby-Dick', 'Herman Melville', 720, false);
addBookToLibrary('The Adventures of Huckleberry Finn', 'Mark Twain', 327, true);

updateLibrary()

function updateLibrary() {
  const shelf = document.querySelector(".shelf");
  const books = document.querySelectorAll(".book");
  for (const book of books) {
    book.remove()
  }
  for (const book of myLibrary) {
    const title = document.createElement("h2");
    title.textContent = book.title;
    title.className = "book-title";

    const author = document.createElement("h3");
    author.textContent = `by ${book.author}`;
    author.className = "book-author";

    const pageCount = document.createElement("p");
    pageCount.textContent = `${book.pageCount} pages`;
    pageCount.className = "book-page-count";

    const status = document.createElement("p");
    status.className = "book-status";
    status.textContent = book.status ? "Read" : "Unread";

    const options = document.createElement("button");
    options.className = "options-button";

    const optionsIcon = document.createElement("img");
    optionsIcon.setAttribute("src", "./images/feather.svg");

    options.append(optionsIcon);

    const entry = document.createElement("div");
    entry.append(title, author, pageCount, status, options)
    entry.classList.add("book", book.status ? "status-read" : "status-unread");

    const bookTitle = book.title;
    const bookID = bookTitle.replace(/ /g, "-").toLowerCase();
    entry.setAttribute('id', bookID)

    shelf.appendChild(entry);
  }
  const addBookButton = document.createElement("div");
  addBookButton.textContent = "+";
  addBookButton.className = ("class", "add-book-button");
  shelf.appendChild(addBookButton);
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

const addBookForm = document.querySelector(".modal");
const addBookButton = document.querySelector(".add-book-button");
addBookButton.addEventListener("click", function (e) {
  addBookForm.style.visibility = "visible";
});

const bookFormClose = document.querySelector(".close");
bookFormClose.addEventListener("click", (e) => {
  addBookForm.style.visibility = "hidden";
});

console.log(myLibrary[0].info());

