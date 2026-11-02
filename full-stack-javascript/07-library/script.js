const dialog = documento.getElementById("book-dialog");
const newBookBtn = document.getElementById("btn-new-book");
const closeDialogBtn = document.getElementById("btn-close-dialog");
const bookForm = document.getElementById("book-form");

let myLibrary = [];

newBookBtn.addEventListener("click", () => {
    dialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
    dialog.close();
});

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = Number(document.getElementById("pages").value);
    const read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);

    bookForm.requestFullscreen();

    dialog.close();
});

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


Book.prototype.info = function () {
    return `${this.id}, ${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "Read" : "Not read yet"}`;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = newBook(title, author, pages, read);

    myLibrary.push(newBook);

    displayBooks();
}

function displayBooks() {
    const libraryContainer = document.getElementById("library-container");

    libraryContainer.replaceChildren();

    myLibrary.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        const title = document.createElement("h3");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = `By: ${book.author}`;

        const pages = document.createElement("p");
        pages.textContent = `${book.pages} pages`;

        const readStatus = document.createElement("p");
        readStatus.textContent = book.read ? "Read" : "Not read yet";

        bookCard.append(title, author, pages, readStatus);

        libraryContainer.appendChild(bookCard);
    });
}
