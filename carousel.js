document.addEventListener('DOMContentLoaded', function () {
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    let currentIndex = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    // Función para obtener slides visibles según el tamaño de pantalla
    function getSlidesToShow() {
        return window.innerWidth <= 576 ? 1 : window.innerWidth <= 768 ? 2 : 3;
    }

    // Actualizar la posición del carrusel
    function updateCarousel() {
        const slidesToShow = getSlidesToShow();
        // Aseguramos que currentIndex no exceda el límite
        currentIndex = Math.min(Math.max(currentIndex, 0), slides.length - slidesToShow);
        const translateValue = -(currentIndex * (100 / slidesToShow));
        carouselContainer.style.transform = `translateX(${translateValue}%)`;
        prevTranslate = translateValue * (carouselContainer.offsetWidth / 100);
    }

    // Mover al siguiente slide
    function moveToNext() {
        const slidesToShow = getSlidesToShow();
        if (currentIndex < slides.length - slidesToShow) {
            currentIndex += 1;
        } else {
            currentIndex = 0; // Vuelve al inicio
        }
        updateCarousel();
    }

    // Mover al slide anterior
    function moveToPrev() {
        const slidesToShow = getSlidesToShow();
        if (currentIndex > 0) {
            currentIndex -= 1;
        } else {
            currentIndex = slides.length - slidesToShow; // Va al final
        }
        updateCarousel();
    }

    // Eventos para botones
    prevButton.addEventListener('click', moveToPrev);
    nextButton.addEventListener('click', moveToNext);

    // Zoom en imágenes
    document.querySelectorAll('.carousel-slide img').forEach(img => {
        img.addEventListener('click', function (e) {
            e.stopPropagation();
            showZoomedImage(this);
        });
    });

    function showZoomedImage(img) {
        const clonedImg = img.cloneNode();
        clonedImg.classList.add('zoomed-image');
        overlay.appendChild(clonedImg);
        overlay.style.display = 'block';

        overlay.addEventListener('click', closeZoom, { once: true });
        document.addEventListener('keydown', function escListener(e) {
            if (e.key === 'Escape') closeZoom();
        }, { once: true });
    }

    function closeZoom() {
        overlay.style.display = 'none';
        overlay.innerHTML = '';
    }

    // Soporte para arrastrar (drag) con mouse
    carouselContainer.addEventListener('mousedown', startDragging);
    carouselContainer.addEventListener('mouseup', stopDragging);
    carouselContainer.addEventListener('mouseleave', stopDragging);
    carouselContainer.addEventListener('mousemove', drag);

    // Soporte para arrastrar (touch) en dispositivos móviles
    carouselContainer.addEventListener('touchstart', startDragging);
    carouselContainer.addEventListener('touchend', stopDragging);
    carouselContainer.addEventListener('touchmove', drag);

    function startDragging(e) {
        isDragging = true;
        startPos = getPositionX(e);
        currentTranslate = prevTranslate;
        carouselContainer.style.transition = 'none';
        e.preventDefault(); // Evita selección de texto o scroll no deseado
    }

    function stopDragging() {
        if (isDragging) {
            isDragging = false;
            carouselContainer.style.transition = 'transform 0.5s ease-in-out';
            const slidesToShow = getSlidesToShow();
            const slideWidth = carouselContainer.offsetWidth / slidesToShow;
            const movedBy = currentTranslate - prevTranslate;

            // Determinar si avanzar o retroceder según el desplazamiento
            if (movedBy < -slideWidth * 0.3) {
                moveToNext();
            } else if (movedBy > slideWidth * 0.3) {
                moveToPrev();
            } else {
                updateCarousel();
            }
        }
    }

    function drag(e) {
        if (isDragging) {
            const currentPosition = getPositionX(e);
            currentTranslate = prevTranslate + (currentPosition - startPos);
            carouselContainer.style.transform = `translateX(${currentTranslate}px)`;
        }
    }

    function getPositionX(e) {
        return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }

    // Actualizar en cambio de tamaño
    window.addEventListener('resize', () => {
        updateCarousel(); // Solo actualiza, no reinicia currentIndex
    });

    // Inicializar
    updateCarousel();
});