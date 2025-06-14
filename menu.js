document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");
    const menuLinks = document.querySelectorAll(".menu a");

    // Alternar menú y cambiar el ícono
    menuToggle.addEventListener("click", (e) => {
        e.preventDefault();
        menu.classList.toggle("active");

        if(menu.classList.contains("active")){
            menuToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        } else {
            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }

        menuToggle.setAttribute('aria-expanded', menu.classList.contains('active'));
    });

    // Cerrar menú al hacer click en enlaces
    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
            menu.classList.remove("active");
            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    
});
