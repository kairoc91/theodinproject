const dialog = document.getElementById("book-dialog");

const newBookBtn = document.getElementById("btn-new-book");
newBookBtn.addEventListener("click", () => {
    dialog.showModal();
});

const closeDialogBtn = document.getElementById("btn-close-dialog");
closeDialogBtn.addEventListener("click", () => {
    dialog.close();
});

const bookForm = document.getElementById("book-form");
bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = Number(document.getElementById("pages").value);
    const read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);

    bookForm.reset();

    dialog.close();
});

let myLibrary = [];

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

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);

    myLibrary.push(newBook);

    displayBooks();
}

function displayBooks() {
    const libraryContainer = document.getElementById("library-container");

    libraryContainer.replaceChildren();

    myLibrary.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.dataset.id = book.id;

        const title = document.createElement("h3");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = `By: ${book.author}`;

        const pages = document.createElement("p");
        pages.textContent = `${book.pages} pages`;

        const readStatus = document.createElement("p");
        readStatus.textContent = book.read ? "Read" : "Not read yet";

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("btn-remove");
        removeBtn.addEventListener("click", () => {
            removeBookFromLibrary(book.id);

        });

        const toggleReadBtn = document.createElement("button");
        toggleReadBtn.textContent = book.read ? "Mark Unread" : "Mark Read";
        toggleReadBtn.classList.add("btn-toggle-read");
        toggleReadBtn.addEventListener("click", () => {
            book.toggleRead();
            displayBooks();
        });

        bookCard.append(title, author, pages, readStatus, removeBtn, toggleReadBtn);
        libraryContainer.appendChild(bookCard);
    });
}

function removeBookFromLibrary(id) {
    myLibrary = myLibrary.filter((book) => book.id !== id);

    displayBooks();
}