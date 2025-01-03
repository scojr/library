const myLibrary = [];

class Book {
  constructor(title, author, pageCount, status, ID) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.status = status;
    this.ID = filterBookName(title);
  }
}

(function sampleBooks() {
  addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
  addBookToLibrary('1984', 'George Orwell', 368, true);
  addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, false);
  addBookToLibrary('Moby-Dick', 'Herman Melville', 720, false);
  addBookToLibrary('The Adventures of Huckleberry Finn', 'Mark Twain', 327, true);
})();


function updateLibrary() {
  const shelf = document.querySelector(".shelf");
  clearLibrary();
  for (const book of myLibrary) {
    const title = document.createElement("h2");
    title.textContent = book.title;
    title.className = "book-title";

    const author = document.createElement("h3");
    if (book.author) {
      author.textContent = `by ${book.author}`;
    } else {
      author.textContent = "";
    }
    author.className = "book-author";

    const pageCount = document.createElement("p");
    if (book.pageCount) {
      pageCount.textContent = `${book.pageCount} pages`;
    } else {
      pageCount.textContent = "";
    }
    pageCount.className = "book-page-count";

    const status = document.createElement("p");
    status.className = "book-status";
    status.textContent = book.status ? "Read" : "Unread";

    const options = document.createElement("button");
    options.className = "options-button";
    options.addEventListener("click", openBookForm);

    const optionsIcon = document.createElement("img");
    optionsIcon.setAttribute("src", "./images/feather.svg");

    options.append(optionsIcon);

    const entry = document.createElement("div");
    entry.append(title, author, pageCount, status, options)
    entry.classList.add("book", book.status ? "status-read" : "status-unread");

    entry.setAttribute('id', filterBookName(book.title))
    shelf.appendChild(entry);
  }
  const addBookButton = document.createElement("div");
  addBookButton.textContent = "+";
  addBookButton.className = ("class", "add-book-button");
  shelf.appendChild(addBookButton);
  addBookButton.addEventListener("click", openBookForm);
}

function clearLibrary() {
  const shelf = document.querySelector(".shelf");
  shelfItems = Array.from(shelf.children);
  for (items of shelfItems) {
    items.remove();
  }

}

function filterBookName(name, formatted) {
  if (formatted) {
    return name.replace(/[^a-zA-Z0-9-. ]/g, "");
  } else {
    return name.replace(/ /g, "-").toLowerCase().replace(/[^a-zA-Z0-9-]/g, "");
  }
}

function addBookToLibrary(title, author, pageCount, status) {
  myLibrary.push(new Book(title, author, pageCount, status));
  updateLibrary();
}


const bookFormSubmit = document.querySelector(".submit-button");
bookFormSubmit.addEventListener("click", takeFormInput);

function takeFormInput(event) {
  event.preventDefault();
  const input = document.querySelector("#title");
  const requiredLabel = document.querySelector(".required-label")
  inputState = input.validity;

  if (inputState.valid) {
    if (editBookEntry) {
      editBookEntry.title = filterBookName(document.querySelector("#title").value, true);
      editBookEntry.author = document.querySelector("#author").value;
      editBookEntry.pageCount = document.querySelector("#pages").value;
      editBookEntry.status = document.querySelector("#status").checked;
      editBookEntry.ID = filterBookName(document.querySelector("#title").value);
      updateLibrary();
      closeBookForm();
    } else {
      if (myLibrary.some(book => book.ID === filterBookName(document.querySelector("#title").value))) {
        requiredLabel.style.setProperty('--duplicate-title-warning-visiblity', 'visible');
        input.style.border = "1px solid red"
      } else {
        event.preventDefault();
        const title = document.querySelector("#title").value;
        const author = document.querySelector("#author").value;
        const pageCount = document.querySelector("#pages").value;
        const status = document.querySelector("#status").checked;
        addBookToLibrary(title, author, pageCount, status);
        updateLibrary();
        closeBookForm();
      }
    }
  } else {
    requiredLabel.style.setProperty('--required-warning-visibility', 'visible');
    input.style.border = "1px solid red"
  }
}

let editBookEntry = "";
function openBookForm(event) {
  if (event.currentTarget.className == "options-button") {
    editBookEntry = myLibrary.find((book) => book.ID === event.currentTarget.parentElement.id);
    document.querySelector(".delete-button").classList.replace("hidden", "visible");
    document.querySelector(".form-header").textContent = "Edit Book Entry";
    document.querySelector("#title").value = editBookEntry.title;
    document.querySelector("#author").value = editBookEntry.author;
    document.querySelector("#pages").value = editBookEntry.pageCount;
    document.querySelector("#status").checked = editBookEntry.status;
  }
  addBookModal.style.visibility = "visible";
}

const addBookModal = document.querySelector("#addBookModal");
const confirmDeleteModal = document.querySelector("#confirmDeleteModal");
const addBookForm = document.querySelector(".add-book-form");
const bookFormCancel = document.querySelector(".cancel-button");
const bookDeleteEntry = document.querySelector(".delete-button");

bookDeleteEntry.addEventListener("click", (event) => {
  event.preventDefault();
  addBookModal.style.visibility = "hidden";
  confirmDeleteModal.style.visibility = "visible";
  document.querySelector(".delete-button").classList.replace("visible", "hidden");
  confirmDeleteModal.querySelector(".confirm-placeholder").textContent = `${editBookEntry.title} by ${editBookEntry.author}`;

  document.querySelector(".cancel-delete-button").addEventListener("click", () => {
    closeBookForm();
  });
});

document.querySelector(".confirm-button").addEventListener("click", () => {
  myLibrary.splice(myLibrary.indexOf(editBookEntry), 1);
  closeBookForm();
  updateLibrary();
});

addBookModal.addEventListener("mousedown", () => {
  if (!addBookModal.querySelector(".modal-content").matches(':hover')) {
    closeBookForm();
  }
});

confirmDeleteModal.addEventListener("mousedown", () => {
  if (!confirmDeleteModal.querySelector(".modal-content").matches(':hover')) {
    closeBookForm();
  }
});

bookFormCancel.addEventListener("click", (event) => {
  event.preventDefault();
  closeBookForm();
});

function closeBookForm() {
  editBookEntry = "";
  addBookModal.style.visibility = "hidden";
  confirmDeleteModal.style.visibility = "hidden";
  addBookForm.reset();
  const requiredLabel = document.querySelector(".required-label")
  requiredLabel.style.setProperty('--duplicate-title-warning-visiblity', 'hidden');
  requiredLabel.style.setProperty('--required-warning-visibility', 'hidden');
  document.querySelector(".delete-button").classList.replace("visible", "hidden");
  document.querySelector("#title").style.border = "1px solid var(--charcoal-black)";
  document.querySelector(".form-header").textContent = "Add Book to Library";
}