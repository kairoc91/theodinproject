export function loadMenu() {
    const content = document.querySelector("#content");
    content.textContent = "";

    const title = document.createElement("h1");
    title.textContent = "Our Menu";

    const image = document.createElement("img");
    image.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400";
    image.alt = "Delicious Dish";
    image.width = 350;

    const item1 = document.createElement("p");
    item1.textContent = "🍝 Spaghetti Carbonara - $14";

    const item2 = document.createElement("p");
    item2.textContent = "🍕 Margherita Pizza - $12";

    const item3 = document.createElement("p");
    item3.textContent = "🥗 Fresh Caesar Salad - $10";

    const item4 = document.createElement("p");
    item4.textContent = "🍰 Classic Tiramisu - $8";

    content.append(title, image, item1, item2, item3, item4);
}

