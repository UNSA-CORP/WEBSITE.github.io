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


// scripts.js

document.addEventListener('DOMContentLoaded', function () {
    // Obtén referencias a los elementos del formulario
    const donateForm = document.getElementById('donateForm');
    const stripeButton = document.getElementById('stripeButton');
    const paypalButton = document.getElementById('paypalButton');
  
    // Agrega un evento al formulario para manejar la donación
    donateForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const donationAmount = document.getElementById('donationAmount').value;
  
      // Validación del monto de donación
      if (!donationAmount || isNaN(donationAmount) || parseFloat(donationAmount) <= 0) {
        alert('Por favor, ingresa un monto de donación válido.');
        return;
      }
  
      // Verifica qué método de pago ha seleccionado el usuario
      if (stripeButton.checked) {
        // Lógica para procesar el pago con Stripe
        alert(`Procesando pago de $${donationAmount} con Stripe.`);
      } else if (paypalButton.checked) {
        // Lógica para redirigir a la página de PayPal
        alert(`Serás redirigido a PayPal para completar tu donación de $${donationAmount}.`);
      } else {
        alert('Por favor, selecciona un método de pago.');
      }
    });
  });
  




  // Transiciones adicionales con JavaScript
  var customAmountInput = document.querySelector('.custom-amount-input');

  function toggleCustomAmount() {
    customAmountInput.style.display = customAmountInput.style.display === 'none' || customAmountInput.style.display === '' ? 'block' : 'none';
  }
  
  document.getElementById('otro').addEventListener('click', toggleCustomAmount);
  