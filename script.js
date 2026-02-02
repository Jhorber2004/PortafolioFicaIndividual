// ==========================================
// CONFIGURACIÓN INICIAL
// ==========================================
let currentPage = 1;
const totalPages = 2;
let isTransitioning = false;

// Elementos del DOM
const prevButton = document.getElementById('prevPage');
const nextButton = document.getElementById('nextPage');
const currentPageElement = document.querySelector('.current-page');
const pages = document.querySelectorAll('.page');

// ==========================================
// FUNCIONES DE NAVEGACIÓN
// ==========================================

/**
 * Actualiza el indicador de página actual
 */
function updatePageIndicator() {
    currentPageElement.textContent = currentPage;
    
    // Actualizar estado de los botones
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

/**
 * Navega a una página específica con animación moderna de fade
 * @param {number} targetPage - Número de la página objetivo
 */
function navigateToPage(targetPage) {
    if (targetPage < 1 || targetPage > totalPages || targetPage === currentPage || isTransitioning) {
        return;
    }
    
    isTransitioning = true;
    
    const currentPageElement = document.getElementById(`page${currentPage}`);
    const nextPageElement = document.getElementById(`page${targetPage}`);
    
    // Agregar clase de salida a la página actual
    currentPageElement.classList.add('fade-out');
    
    // Después de un breve delay, mostrar la página siguiente
    setTimeout(() => {
        // Ocultar página actual
        currentPageElement.classList.remove('active', 'fade-out');
        
        // Mostrar página siguiente con animación
        nextPageElement.classList.add('active', 'fade-in');
        
        // Actualizar página actual
        currentPage = targetPage;
        updatePageIndicator();
        
        // Limpiar clases de animación
        setTimeout(() => {
            nextPageElement.classList.remove('fade-in');
            isTransitioning = false;
        }, 600);
    }, 300);
}

/**
 * Navega a la página anterior
 */
function goToPreviousPage() {
    navigateToPage(currentPage - 1);
}

/**
 * Navega a la página siguiente
 */
function goToNextPage() {
    navigateToPage(currentPage + 1);
}

// ==========================================
// EVENT LISTENERS
// ==========================================

// Navegación SOLO con botones
prevButton.addEventListener('click', goToPreviousPage);
nextButton.addEventListener('click', goToNextPage);

// ==========================================
// ANIMACIÓN DE CARGA
// ==========================================

/**
 * Animación de entrada cuando se carga la página
 */
window.addEventListener('load', () => {
    // Asegurar que la primera página esté activa
    updatePageIndicator();
    
    // Agregar clase de carga completada
    document.body.classList.add('loaded');
    
    // Animación suave de entrada para la página inicial
    const firstPage = document.getElementById('page1');
    firstPage.style.opacity = '0';
    firstPage.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
        firstPage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        firstPage.style.opacity = '1';
        firstPage.style.transform = 'scale(1)';
    }, 100);
});

// ==========================================
// FUNCIONES AUXILIARES
// ==========================================

/**
 * Debugging - Mostrar información de la página actual en consola
 */
function logCurrentPage() {
    console.log(`Página actual: ${currentPage} de ${totalPages}`);
    console.log(`Transición en curso: ${isTransitioning}`);
}

/**
 * Función para resetear a la primera página
 */
function resetToFirstPage() {
    if (currentPage !== 1 && !isTransitioning) {
        navigateToPage(1);
    }
}

/**
 * Ir directamente a una página específica
 */
function goToPage(pageNumber) {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
        navigateToPage(pageNumber);
    } else {
        console.warn(`Página ${pageNumber} no existe. Debe estar entre 1 y ${totalPages}.`);
    }
}

// Hacer disponibles funciones globalmente (para debugging)
window.resetPortfolio = resetToFirstPage;
window.logPage = logCurrentPage;
window.goToPage = goToPage;

// ==========================================
// MEJORAS DE ACCESIBILIDAD
// ==========================================

// Anunciar cambios de página para lectores de pantalla
function announcePageChange(pageNum) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = `Navegando a página ${pageNum} de ${totalPages}`;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        if (document.body.contains(announcement)) {
            document.body.removeChild(announcement);
        }
    }, 1000);
}

// Agregar estilo para lectores de pantalla
const style = document.createElement('style');
style.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        white-space: nowrap;
        border: 0;
    }
`;
document.head.appendChild(style);

// Focus management para accesibilidad con teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// ==========================================
// INICIALIZACIÓN Y MENSAJES
// ==========================================
console.log('📚 Portafolio de Física - Universidad Central del Ecuador');
console.log('✨ Sistema de navegación inicializado');
console.log('');
console.log('🖱️  Controles disponibles:');
console.log('   • Click en los botones de navegación ← →');
console.log('');
console.log('🔧 Comandos de consola disponibles:');
console.log('   • window.resetPortfolio() - Volver a la carátula');
console.log('   • window.logPage() - Ver información de página actual');
console.log('   • window.goToPage(n) - Ir a página específica');
console.log('');

// Mensaje de bienvenida después de un momento
setTimeout(() => {
    console.log('🎓 Portafolio listo. ¡Éxitos en tus estudios de Física!');
}, 1200);