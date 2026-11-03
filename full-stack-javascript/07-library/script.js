// ==========================================
// 1. ESTADO DA APLICAÇÃO (DATA / STATE)
// ==========================================
// Array principal que funciona como a "única fonte da verdade" para os livros da biblioteca
let myLibrary = [];

// ==========================================
// 2. CONSTRUTOR E PROTÓTIPO (BOOK OBJECT)
// ==========================================
// Função construtora para criar instâncias de novos livros
function Book(title, author, pages, read) {
    this.id = crypto.randomUUID(); // Gera um identificador único universal para cada livro
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; // Booleano: true (lido) ou false (não lido)
}

// Retorna uma string formatada com os dados do livro
Book.prototype.info = function () {
    return `${this.id}, ${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "Read" : "Not read yet"}`;
};

// Alterna o estado de leitura da instância atual (true <-> false)
Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

// ==========================================
// 3. LÓGICA DE DADOS (GERENCIAMENTO DA BIBLIOTECA)
// ==========================================
// Cria uma nova instância de Book, adiciona ao array e atualiza a interface
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

// Remove o livro do array comparando pelo ID único e redesenha a tela
function removeBookFromLibrary(id) {
    myLibrary = myLibrary.filter((book) => book.id !== id);
    displayBooks();
}

// ==========================================
// 4. INTERFACE DO USUÁRIO (DOM / VIEW)
// ==========================================
// Percorre o array myLibrary e renderiza os cards de forma limpa e segura contra XSS
function displayBooks() {
    const libraryContainer = document.getElementById("library-container");

    // Limpa todos os filhos anteriores com segurança antes de renderizar novamente
    libraryContainer.replaceChildren();

    myLibrary.forEach((book) => {
        // Criação do card principal do livro
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.dataset.id = book.id; // Vincula o ID único ao elemento HTML via data-attribute

        // Criação e preenchimento dos textos usando textContent (imune a injeções de script XSS)
        const title = document.createElement("h3");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = `By: ${book.author}`;

        const pages = document.createElement("p");
        pages.textContent = `${book.pages} pages`;

        const readStatus = document.createElement("p");
        readStatus.textContent = book.read ? "Read" : "Not read yet";

        // Botão para alternar status de leitura
        const toggleReadBtn = document.createElement("button");
        toggleReadBtn.textContent = book.read ? "Mark Unread" : "Mark Read";
        toggleReadBtn.classList.add("btn-toggle-read");
        toggleReadBtn.addEventListener("click", () => {
            book.toggleRead();
            displayBooks(); // Atualiza a tela com o novo status
        });

        // Botão para remover livro
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("btn-remove");
        removeBtn.addEventListener("click", () => {
            removeBookFromLibrary(book.id);
        });

        // Monta todos os nós no card e o card no container da página
        bookCard.append(title, author, pages, readStatus, toggleReadBtn, removeBtn);
        libraryContainer.appendChild(bookCard);
    });
}

// ==========================================
// 5. SELEÇÃO DO DOM E EVENT LISTENERS
// ==========================================
const dialog = document.getElementById("book-dialog");
const newBookBtn = document.getElementById("btn-new-book");
const closeDialogBtn = document.getElementById("btn-close-dialog");
const bookForm = document.getElementById("book-form");

// Abre a janela modal do formulário
newBookBtn.addEventListener("click", () => {
    dialog.showModal();
});

// Fecha a janela modal
closeDialogBtn.addEventListener("click", () => {
    dialog.close();
});

// Processa o envio do formulário
bookForm.addEventListener("submit", (e) => {
    // Impede o envio padrão HTTP que causaria o recarregamento da página
    e.preventDefault();

    // Captura e formata os dados inseridos pelo usuário
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = Number(document.getElementById("pages").value);
    const read = document.getElementById("read").checked;

    // Adiciona o novo livro e fecha o modal
    addBookToLibrary(title, author, pages, read);
    bookForm.reset();
    dialog.close();
});
