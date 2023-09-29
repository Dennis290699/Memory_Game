const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player'); // CONSTANTE PARA RECUPERAR EL NOMBRE DEL JUGADOR
const timer = document.querySelector('.timer'); // CONSTANTE PARA EL CRONOMETRO

const characters = [
  'beth',
  'jerry',
  'jessica',
  'morty',
  'pessoa-passaro',
  'pickle-rick',
  'rick',
  'summer',
  'meeseeks',
  'scroopy',
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';

let modal; // Definir la variable modal en un ámbito más amplio

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disable-card');
  if (disabledCards.length == 20) {
    clearInterval(this.loop);
    const modal = document.getElementById('myModal');
    const modalMessage = document.getElementById('modal-message');
    modal.style.display = 'block';
    modalMessage.innerHTML = `¡Excelente, ${spanPlayer.innerHTML}! Tu tiempo: ${timer.innerHTML}`;

    // Agregar evento para cerrar el modal haciendo clic en la "x"
    const closeBtn = document.getElementsByClassName('close')[0];
    closeBtn.onclick = () => {
      modal.style.display = 'none';
    }
  }
}

// Agregar evento para el botón "Reintentar"
const retryButton = document.getElementById('retry-button');
retryButton.onclick = () => {
  if (modal) {
    modal.style.display = 'none'; // Oculta el modal
  }
  // Aquí puedes agregar código para reiniciar el juego, por ejemplo:
  location.reload(); // Recarga la página para reiniciar el juego
}

// Agregar evento para el botón "Salir"
const exitButton = document.getElementById('exit-button');
exitButton.onclick = () => {
  // Aquí puedes redirigir al usuario a otra página
  window.location.href = '../index.html'; // Cambia 'otra_pagina.html' por la URL a la que deseas redirigir
}


const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter == secondCharacter) {

    firstCard.firstChild.classList.add('disable-card');
    secondCard.firstChild.classList.add('disable-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {

    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }
}

const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard == '') {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;
  } else if (secondCard == '') {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();
  }
}

const createCard = (character) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../assets/cards/Rick_And_Morty/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

const startTimer = () => {
  let currentTime = 0;
  this.loop = setInterval(() => {
    currentTime++;
    timer.innerHTML = formatTime(currentTime);
  }, 1000);
}

window.onload = () => {

  spanPlayer.innerHTML = localStorage.getItem('player'); // RECUPERAMOS EL NOMBRE DEL PLAYER ASIGNAMOS EL VALOR PARA LA CONSTANTE
  startTimer();
  loadGame();
}