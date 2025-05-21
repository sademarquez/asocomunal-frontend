document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para los enlaces del menú
    document.querySelectorAll('nav a.nav-button').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Previene el comportamiento predeterminado del enlace

            const targetId = this.getAttribute('href'); // Obtiene el ID del destino
            const targetElement = document.querySelector(targetId); // Selecciona el elemento destino

            if (targetElement) {
                // Desplazamiento suave a la sección
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Desplazamiento suave para el botón "Ver Noticias Recientes"
    const scrollBtn = document.querySelector('.scroll-btn');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // Funcionalidad del Botón de Emergencia/Denuncias
    const emergencyBtn = document.getElementById('emergencyBtn');
    const emergencyForm = document.getElementById('emergencyForm');
    const closePopupBtn = emergencyForm.querySelector('.close-popup-btn');
    const submitDenunciaBtn = document.getElementById('submitDenuncia');
    const denunciaText = document.getElementById('denunciaText');

    if (emergencyBtn && emergencyForm) {
        emergencyBtn.addEventListener('click', function() {
            emergencyForm.style.display = 'block'; // Muestra el formulario
        });

        closePopupBtn.addEventListener('click', function() {
            emergencyForm.style.display = 'none'; // Oculta el formulario
        });

        // Enviar Denuncia (Simulación, en un entorno real necesitarías un backend)
        submitDenunciaBtn.addEventListener('click', function() {
            const denuncia = denunciaText.value.trim();
            if (denuncia) {
                // Simulación de envío: Podrías abrir WhatsApp con el mensaje preescrito
                // ¡IMPORTANTE! Reemplaza '573XXXXXXXXX' con el número de WhatsApp real.
                const whatsappNumber = '57320XXXXXXX'; // Tu número de WhatsApp de ASOCOMUNAL
                const encodedDenuncia = encodeURIComponent(`🚨 Denuncia Rápida ASOCOMUNAL:\n\n${denuncia}\n\n`);
                window.open(`https://wa.me/${whatsappNumber}?text=${encodedDenuncia}`, '_blank');

                alert('Gracias por tu denuncia. Nos pondremos en contacto si es necesario.');
                denunciaText.value = ''; // Limpia el textarea
                emergencyForm.style.display = 'none'; // Oculta el formulario
            } else {
                alert('Por favor, escribe tu denuncia.');
            }
        });
    }

    // Simulación de envío de formulario de registro
    const registrationForm = document.querySelector('.registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita que el formulario se envíe realmente

            // Aquí se recogerían los datos del formulario (nombre, email, etc.)
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;

            // En un entorno real, enviarías estos datos a un servidor
            console.log('Datos de Registro (Simulación):', { nombre, email });
            alert(`¡Gracias por registrarte, ${nombre}! En breve recibirás noticias de ASOCOMUNAL.`);

            // Opcional: limpiar el formulario
            registrationForm.reset();
        });
    }
});