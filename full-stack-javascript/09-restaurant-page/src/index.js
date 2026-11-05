import { loadHome } from "./home.js";
import { loadMenu } from "./menu.js";
import { loadContact } from "./contact.js";

const nav = document.querySelector("nav");

const buttonHome = document.createElement("button");
buttonHome.textContent = "Home";
buttonHome.addEventListener("click", loadHome);
nav.appendChild(buttonHome);

const buttonMenu = document.createElement("button");
buttonMenu.textContent = "Menu";
buttonMenu.addEventListener("click", loadMenu);
nav.appendChild(buttonMenu);

const buttonContact = document.createElement("button");
buttonContact.textContent = "Contact";
buttonContact.addEventListener("click", loadContact);
nav.appendChild(buttonContact);

// Initial tab load
loadHome();
