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


// Script de validación y envío del formulario
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
  
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      // Validación de campos (puedes personalizar según tus necesidades)
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;
  
      if (!firstName || !lastName || !email || !subject || !message) {
        alert("Por favor, complete todos los campos antes de enviar el formulario.");
        return;
      }
  
      // Aquí puedes agregar el código para enviar el formulario, por ejemplo, mediante AJAX
  
      // Ejemplo de envío mediante AJAX (puedes ajustar según tus necesidades)
      // const formData = new FormData(contactForm);
      // fetch("URL_DEL_SERVIDOR", {
      //   method: "POST",
      //   body: formData,
      // })
      //   .then(response => response.json())
      //   .then(data => {
      //     // Manejar la respuesta del servidor
      //     console.log(data);
      //   })
      //   .catch(error => {
      //     console.error("Error al enviar el formulario:", error);
      //   });
  
      // Puedes agregar más lógica según tus necesidades
  
      // Limpiar el formulario después del envío
      contactForm.reset();
    });
  });
  