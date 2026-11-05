export function loadContact() {
    const content = document.querySelector("#content");
    content.textContent = "";

    const title = document.createElement("h1");
    title.textContent = "Contact Us";

    const image = document.createElement("img");
    image.src = "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=400";
    image.alt = "Contact and Support";
    image.width = 350;

    const phone = document.createElement("p");
    phone.textContent = "📞 Phone: (555) 123-4567";

    const email = document.createElement("p");
    email.textContent = "✉️ Email: contact@odinsbistro.com";

    const address = document.createElement("p");
    address.textContent = "📍 Address: 123 Main Street, Cityville";

    content.append(title, image, phone, email, address);
}

