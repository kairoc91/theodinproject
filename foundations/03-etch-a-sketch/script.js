const container = document.querySelector(".container");
const btnSize = document.querySelector(".btn-size");

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function createGrid(size) {
    container.replaceChildren();

    const fragment = document.createDocumentFragment();
    const squarePercentage = `${100 / size}%`;

    for (let i = 1; i <= size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        square.style.flex = `0 0 ${squarePercentage}`;
        square.style.opacity = "0.1";
        fragment.appendChild(square);
    }
    container.appendChild(fragment);
}

container.addEventListener("mouseover", (event) => {
    const square = event.target;
    if (!square.classList.contains("grid-square")) return;

    if (!square.style.backgroundColor) {
        square.style.backgroundColor = getRandomColor();
    }

    const currentOpacity = parseFloat(square.style.opacity) || 0;
    if (currentOpacity < 1) {
        square.style.opacity = (currentOpacity + 0.1).toFixed(1);
    }
});

btnSize.addEventListener("click", () => {
    const input = window.prompt("Enter number of squares per side (max 100):");
    if (input === null) return;

    const size = parseInt(input, 10);
    if (isNaN(size) || size < 1 || size > 100) {
        alert("Please enter a valid number between 1 and 100.");
        return;
    }

    createGrid(size);
});

createGrid(16);

