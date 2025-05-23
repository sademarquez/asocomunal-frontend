// script.js

// Menú de Navegación Móvil (Hamburguesa)
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Animar Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Animación del Burger
            burger.classList.toggle('toggle');
        });
    }
};

// Establecer el año actual en el pie de página
const setYear = () => {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
};

// Variable global para el slider para poder destruirlo y recrearlo si es necesario
let gallerySliderInstance = null;

// Inicializar Tiny Slider
function initializeTinySlider() {
    const sliderContainer = document.querySelector('.tiny-slider');
    if (!sliderContainer || sliderContainer.children.length === 0) { // No inicializar si no hay contenedor o no hay imágenes
        console.log("Contenedor del carrusel no encontrado o vacío.");
        return;
    }

    // Si ya existe una instancia, destrúyela antes de recrear
    if (gallerySliderInstance) {
        try {
           gallerySliderInstance.destroy();
        } catch(e) {
            console.warn("No se pudo destruir la instancia anterior del slider:", e);
        }
    }
    
    gallerySliderInstance = tns({
        container: '.tiny-slider',
        items: 1,
        slideBy: 'page',
        autoplay: false, // Desactivado por defecto, puedes ponerlo a true
        autoplayButtonOutput: false, // Ocultar botón de autoplay
        controls: true, // Mostrar flechas de control
        nav: true, // Mostrar puntos de navegación
        mouseDrag: true,
        responsive: {
            600: { // A partir de 600px de ancho
                items: 2,
                edgePadding: 20,
                gutter: 20
            },
            900: { // A partir de 900px de ancho
                items: 3,
                edgePadding: 30,
                gutter: 30
            }
        }
    });
}

// Cargar Propuestas y Galería desde data.json
async function loadContentFromJson() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Cargar Propuestas
        const proposalsGrid = document.querySelector('#propuestas .proposals-grid');
        if (data.proposals && proposalsGrid) {
            proposalsGrid.innerHTML = ''; // Limpiar
            data.proposals.forEach(proposal => {
                const card = document.createElement('div');
                card.classList.add('proposal-card');
                card.innerHTML = `
                    <h3>${proposal.title}</h3>
                    <p>${proposal.description}</p>
                `;
                proposalsGrid.appendChild(card);
            });
        } else {
            console.warn("Sección de propuestas o datos de propuestas no encontrados.");
        }

        // Cargar Imágenes de la Galería
        const sliderContainer = document.querySelector('.tiny-slider');
        if (data.galleryImages && sliderContainer) {
            sliderContainer.innerHTML = ''; // Limpiar
            data.galleryImages.forEach(image => {
                const div = document.createElement('div');
                const img = document.createElement('img');
                img.src = image.src;
                img.alt = image.alt;
                // Opcional: añadir un título o descripción a cada imagen si lo tienes en el JSON
                // if(image.title) {
                //     const title = document.createElement('p');
                //     title.textContent = image.title;
                //     title.style.textAlign = 'center';
                //     div.appendChild(title);
                // }
                div.appendChild(img);
                sliderContainer.appendChild(div);
            });
            // Solo inicializar el slider si se cargaron imágenes
            if (data.galleryImages.length > 0) {
                initializeTinySlider();
            } else {
                 console.log("No hay imágenes en la galería para mostrar.");
            }
        } else {
             console.warn("Contenedor del carrusel o datos de imágenes de galería no encontrados.");
        }

    } catch (error) {
        console.error('Error al cargar el contenido desde JSON:', error);
        // Aquí podrías tener un fallback si el JSON no carga,
        // por ejemplo, mostrar contenido estático definido en el HTML.
    }
}


// Animaciones al hacer scroll
const revealOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
            // Opcional: remover la clase si ya no es visible para re-animar
            // else {
            //     entry.target.classList.remove('visible');
            // }
        });
    }, { threshold: 0.1 }); // El 10% del elemento debe estar visible

    document.querySelectorAll('.content-section, .proposal-card, .news-item, .carousel-container').forEach(section => {
        section.classList.add('reveal'); // Clase base para la animación
        observer.observe(section);
    });
};

// Llamar a las funciones cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    setYear();
    loadContentFromJson(); // Carga propuestas y galería
    revealOnScroll(); // Activa animaciones de scroll
});