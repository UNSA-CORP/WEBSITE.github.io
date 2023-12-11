console.clear();

// Script para el botón de idioma desplegable
const languageBtn = document.getElementById('languageBtn');
const dropdownContent = document.querySelector('.dropdown-content');

languageBtn.addEventListener('click', () => {
  dropdownContent.classList.toggle('show');
});

// Cierra el menú de idiomas si el usuario hace clic fuera de él
window.addEventListener('click', (e) => {
  if (!e.target.matches('#languageBtn')) {
    const dropdowns = document.querySelectorAll('.dropdown-content');
    dropdowns.forEach((dropdown) => {
      if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
      }
    });
  }
});

//SCROLL
// Almacena el valor actual de top
let currentTop = 40;

// Escucha el evento de scroll
window.addEventListener("scroll", function () {
  var navbar = document.querySelector(".navbar");

  // Obtén el desplazamiento vertical
  const scrollY = window.scrollY || window.pageYOffset;

  // Calcula el nuevo valor de top basado en el desplazamiento
  const newTop = Math.max(0, 40 - scrollY);

  // Si el valor de top ha cambiado, actualiza el estilo
  if (newTop !== currentTop) {
    currentTop = newTop;
    navbar.style.top = `${newTop}px`;
  }

  // Ajusta la opacidad en función del desplazamiento
  navbar.style.backgroundColor = `rgba(0, 0, 0, ${Math.min(0.8, scrollY / 40)})`;
});



// Agregar transiciones a la sección de historia
const historyItems = document.querySelectorAll('.history-item');

historyItems.forEach(item => {
    item.addEventListener('mouseover', () => {
        item.style.transition = 'background-color 0.3s ease';
        item.style.backgroundColor = '#f9bc60';
    });

    item.addEventListener('mouseout', () => {
        item.style.transition = 'background-color 0.3s ease';
        item.style.backgroundColor = '#fff';
    });
});
