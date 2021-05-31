// Define variables
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mobileMenu = document.querySelector(".menu-dropdown");

// Toggle menu
mobileMenuBtn.addEventListener("click",()=>{
    mobileMenu.classList.toggle("show-menu")
})