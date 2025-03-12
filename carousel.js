// carousel.js actualizado
document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.querySelector(".carousel-container");
    const slides = document.querySelectorAll(".carousel-slide");
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    let currentIndex = 0;
    let intervalId = null;

    // Evento click para imágenes
    document.querySelectorAll('.carousel-slide img').forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            showZoomedImage(this);
        });
    });

    function showZoomedImage(img) {
        // Pausar carrusel
        clearInterval(intervalId);
        
        // Crear imagen clonada
        const clonedImg = img.cloneNode();
        clonedImg.classList.add('zoomed-image');
        
        // Agregar al overlay
        overlay.appendChild(clonedImg);
        overlay.style.display = 'block';
        
        // Eventos para cerrar
        overlay.addEventListener('click', closeZoom);
        document.addEventListener('keydown', function escListener(e) {
            if (e.key === 'Escape') closeZoom();
        });
    }

    function closeZoom() {
        overlay.style.display = 'none';
        overlay.innerHTML = '';
        startCarousel();
    }

    function startCarousel() {
        intervalId = setInterval(moveCarousel, 5000);
    }

    function moveCarousel() {
        const slidesToShow = window.innerWidth <= 480 ? 1 : 
                           window.innerWidth <= 768 ? 2 : 3;
        
        currentIndex = (currentIndex + slidesToShow) % slides.length;
        carouselContainer.style.transform = `translateX(-${currentIndex * (100 / slidesToShow)}%)`;
    }

    // Iniciar
    startCarousel();

    // Reset en resize
    window.addEventListener('resize', () => {
        currentIndex = 0;
        carouselContainer.style.transform = 'translateX(0)';
    });
});