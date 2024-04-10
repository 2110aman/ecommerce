let menuBar = document.querySelector("#menu-bar");
let cross = document.querySelector("#cross");
let navContent = document.querySelector(".nav-content");
let cartText = document.querySelector(".cart-text");
let accText = document.querySelector(".acc-text");
let navMenus = document.querySelector(".nav-menus");


menuBar.addEventListener("click", (event) => {
navContent.setAttribute("id", "active");
menuBar.style.display = "none";
accText.style.display = "block";
cartText.style.display = "block";
navMenus.style.display = "block";
cross.style.display = "block";
})

cross.addEventListener("click", (event) => {
    navContent.removeAttribute("id");
    menuBar.style.display = "block";
    cross.style.display = "none";
    accText.style.display = "none";
    cartText.style.display = "none";
    navMenus.style.display = "none";
    
})