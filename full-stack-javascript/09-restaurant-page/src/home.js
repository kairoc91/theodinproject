export function loadHome() {
    const content = document.querySelector("#content");
    content.textContent = "";

    const title = document.createElement("h1");
    title.textContent = "Odin's Bistro";

    const image = document.createElement("img");
    image.src = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400";
    image.alt = "Restaurant Interior";
    image.width = 350;

    const description = document.createElement("p");
    description.textContent = "Welcome to Odin's Bistro! We serve the finest dishes crafted with passion, fresh ingredients, and love. Come and enjoy an authentic culinary experience with family and friends.";

    const hours = document.createElement("p");
    hours.textContent = "Opening Hours: Monday - Sunday, 11:00 AM - 10:00 PM";

    content.append(title, image, description, hours);
}

