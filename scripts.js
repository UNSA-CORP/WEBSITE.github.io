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



// Añade estos scripts al final del archivo

document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
  
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  });

  
const { gsap, imagesLoaded } = window;

const buttons = {
	prev: document.querySelector(".btn--left"),
	next: document.querySelector(".btn--right"),
};
const cardsContainerEl = document.querySelector(".cards__wrapper");
const appBgContainerEl = document.querySelector(".app__bg");

const cardInfosContainerEl = document.querySelector(".info__wrapper");

buttons.next.addEventListener("click", () => swapCards("right"));

buttons.prev.addEventListener("click", () => swapCards("left"));

function swapCards(direction) {
	const currentCardEl = cardsContainerEl.querySelector(".current--card");
	const previousCardEl = cardsContainerEl.querySelector(".previous--card");
	const nextCardEl = cardsContainerEl.querySelector(".next--card");

	const currentBgImageEl = appBgContainerEl.querySelector(".current--image");
	const previousBgImageEl = appBgContainerEl.querySelector(".previous--image");
	const nextBgImageEl = appBgContainerEl.querySelector(".next--image");

	changeInfo(direction);
	swapCardsClass();

	removeCardEvents(currentCardEl);

	function swapCardsClass() {
		currentCardEl.classList.remove("current--card");
		previousCardEl.classList.remove("previous--card");
		nextCardEl.classList.remove("next--card");

		currentBgImageEl.classList.remove("current--image");
		previousBgImageEl.classList.remove("previous--image");
		nextBgImageEl.classList.remove("next--image");

		currentCardEl.style.zIndex = "50";
		currentBgImageEl.style.zIndex = "-2";

		if (direction === "right") {
			previousCardEl.style.zIndex = "20";
			nextCardEl.style.zIndex = "30";

			nextBgImageEl.style.zIndex = "-1";

			currentCardEl.classList.add("previous--card");
			previousCardEl.classList.add("next--card");
			nextCardEl.classList.add("current--card");

			currentBgImageEl.classList.add("previous--image");
			previousBgImageEl.classList.add("next--image");
			nextBgImageEl.classList.add("current--image");
		} else if (direction === "left") {
			previousCardEl.style.zIndex = "30";
			nextCardEl.style.zIndex = "20";

			previousBgImageEl.style.zIndex = "-1";

			currentCardEl.classList.add("next--card");
			previousCardEl.classList.add("current--card");
			nextCardEl.classList.add("previous--card");

			currentBgImageEl.classList.add("next--image");
			previousBgImageEl.classList.add("current--image");
			nextBgImageEl.classList.add("previous--image");
		}
	}
}

function changeInfo(direction) {
	let currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
	let previousInfoEl = cardInfosContainerEl.querySelector(".previous--info");
	let nextInfoEl = cardInfosContainerEl.querySelector(".next--info");

	gsap.timeline()
		.to([buttons.prev, buttons.next], {
		duration: 0.2,
		opacity: 0.5,
		pointerEvents: "none",
	})
		.to(
		currentInfoEl.querySelectorAll(".text"),
		{
			duration: 0.4,
			stagger: 0.1,
			translateY: "-120px",
			opacity: 0,
		},
		"-="
	)
		.call(() => {
		swapInfosClass(direction);
	})
		.call(() => initCardEvents())
		.fromTo(
		direction === "right"
		? nextInfoEl.querySelectorAll(".text")
		: previousInfoEl.querySelectorAll(".text"),
		{
			opacity: 0,
			translateY: "40px",
		},
		{
			duration: 0.4,
			stagger: 0.1,
			translateY: "0px",
			opacity: 1,
		}
	)
		.to([buttons.prev, buttons.next], {
		duration: 0.2,
		opacity: 1,
		pointerEvents: "all",
	});

	function swapInfosClass() {
		currentInfoEl.classList.remove("current--info");
		previousInfoEl.classList.remove("previous--info");
		nextInfoEl.classList.remove("next--info");

		if (direction === "right") {
			currentInfoEl.classList.add("previous--info");
			nextInfoEl.classList.add("current--info");
			previousInfoEl.classList.add("next--info");
		} else if (direction === "left") {
			currentInfoEl.classList.add("next--info");
			nextInfoEl.classList.add("previous--info");
			previousInfoEl.classList.add("current--info");
		}
	}
}

function updateCard(e) {
	const card = e.currentTarget;
	const box = card.getBoundingClientRect();
	const centerPosition = {
		x: box.left + box.width / 2,
		y: box.top + box.height / 2,
	};
	let angle = Math.atan2(e.pageX - centerPosition.x, 0) * (35 / Math.PI);
	gsap.set(card, {
		"--current-card-rotation-offset": `${angle}deg`,
	});
	const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
	gsap.set(currentInfoEl, {
		rotateY: `${angle}deg`,
	});
}

function resetCardTransforms(e) {
	const card = e.currentTarget;
	const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
	gsap.set(card, {
		"--current-card-rotation-offset": 0,
	});
	gsap.set(currentInfoEl, {
		rotateY: 0,
	});
}

function initCardEvents() {
	const currentCardEl = cardsContainerEl.querySelector(".current--card");
	currentCardEl.addEventListener("pointermove", updateCard);
	currentCardEl.addEventListener("pointerout", (e) => {
		resetCardTransforms(e);
	});
}

initCardEvents();

function removeCardEvents(card) {
	card.removeEventListener("pointermove", updateCard);
}

function init() {

	let tl = gsap.timeline();

	tl.to(cardsContainerEl.children, {
		delay: 0.15,
		duration: 0.5,
		stagger: {
			ease: "power4.inOut",
			from: "right",
			amount: 0.1,
		},
		"--card-translateY-offset": "0%",
	})
		.to(cardInfosContainerEl.querySelector(".current--info").querySelectorAll(".text"), {
		delay: 0.5,
		duration: 0.4,
		stagger: 0.1,
		opacity: 1,
		translateY: 0,
	})
		.to(
		[buttons.prev, buttons.next],
		{
			duration: 0.4,
			opacity: 1,
			pointerEvents: "all",
		},
		"-=0.4"
	);
}

const waitForImages = () => {
	const images = [...document.querySelectorAll("img")];
	const totalImages = images.length;
	let loadedImages = 0;
	const loaderEl = document.querySelector(".loader span");

	gsap.set(cardsContainerEl.children, {
		"--card-translateY-offset": "100vh",
	});
	gsap.set(cardInfosContainerEl.querySelector(".current--info").querySelectorAll(".text"), {
		translateY: "40px",
		opacity: 0,
	});
	gsap.set([buttons.prev, buttons.next], {
		pointerEvents: "none",
		opacity: "0",
	});

	images.forEach((image) => {
		imagesLoaded(image, (instance) => {
			if (instance.isComplete) {
				loadedImages++;
				let loadProgress = loadedImages / totalImages;

				gsap.to(loaderEl, {
					duration: 1,
					scaleX: loadProgress,
					backgroundColor: `hsl(${loadProgress * 120}, 100%, 50%`,
				});

				if (totalImages == loadedImages) {
					gsap.timeline()
						.to(".loading__wrapper", {
						duration: 0.8,
						opacity: 0,
						pointerEvents: "none",
					})
						.call(() => init());
				}
			}
		});
	});
};

waitForImages();


  document.getElementById('faqButton').addEventListener('click', function () {
	var faqPopup = document.getElementById('faqPopup');
	faqPopup.style.display = (faqPopup.style.display === 'none' || faqPopup.style.display === '') ? 'block' : 'none';
  });

// GLOBO
function toggleFAQ() {
    var chat = document.getElementById("faqChat");
    chat.style.display = (chat.style.display === "block") ? "none" : "block";
}

function showAnswer(answerId) {
    var answer = document.getElementById("answer" + answerId);
    answer.style.display = (answer.style.display === "block") ? "none" : "block";
}

function toggleAnswer(answerId) {
    var answer = document.getElementById("answer" + answerId);
    answer.style.display = (answer.style.display === "block") ? "none" : "block";
}

// Función para mostrar el chat
function showChat() {
	var faqChat = document.getElementById("faqChat");
	faqChat.style.display = "flex";
  }
  
  // Función para cerrar el chat
  function closeChat() {
	var faqChat = document.getElementById("faqChat");
	faqChat.style.display = "none";
  
	var faqButton = document.getElementById("faqButton");
	faqButton.style.display = "block";
  }
  
  // Función para mostrar la respuesta a una pregunta
  function showAnswer(answerId) {
	var answer = document.getElementById("answer" + answerId);
	answer.style.display = "block";
  }
  
  // Función para ocultar el chat al mover el cursor fuera
  function hideChat() {
	var faqChat = document.getElementById("faqChat");
	faqChat.style.display = "none";
  
	var faqButton = document.getElementById("faqButton");
	faqButton.style.display = "block";
  }
  
  // Función para ocultar la respuesta al mover el cursor fuera
  function hideAnswer(answerId) {
	var answer = document.getElementById("answer" + answerId);
	answer.style.display = "none";
  }
  
