// Variables
const characterList = ['r2d2', 'yoda'];
const character = document.querySelector('.char');

const wrap = document.querySelector('.char__wrap');

const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');

// -----------------------------------------------------------------
// ------------------ Functions: Change character ------------------
// -----------------------------------------------------------------

let currentIndex = 0;
let currentCharacter;

// Change character
function changeCharacter(name) {
  character.className = 'char';
  character.id = `${name}`;
  wrap.classList.remove('to-left', 'to-right');
  document.querySelector('.char__shadow').className = `char__shadow char__shadow--${name}`;
}

// Select next character
function nextCharacter() {

  if (currentIndex === (characterList.length - 1)) {
    currentCharacter = characterList[0]
    currentIndex = 0;
  } else {
    currentCharacter = characterList[currentIndex + 1]
    currentIndex += 1;
  }

  character.classList.remove('run-animation');
  changeCharacter(currentCharacter);
  wrap.classList.add('to-right');
  startAnimation();
}

// Select previous character
function previousCharacter() {

  if (currentIndex === 0) {
    currentCharacter = characterList[(characterList.length - 1)]
    currentIndex = characterList.length - 1;
  } else {
    currentCharacter = characterList[currentIndex - 1]
    currentIndex -= 1;
  }

  character.classList.remove('run-animation');
  changeCharacter(currentCharacter);
  wrap.classList.add('to-left');
  startAnimation();
}

nextBtn.addEventListener('click', () => { nextCharacter(); })
prevBtn.addEventListener('click', () => { previousCharacter(); })

// -----------------------------------------------------------
// ------------------ Functions: Animations ------------------
// -----------------------------------------------------------

let delayAnimation,
  runAnimation;

let stateTwo,
  stateThree,
  stateFour;

// Starts animation
function startAnimation() {

  clearAnimation();
  delayAnimation = setTimeout(() => {
    character.classList.add('run-animation');
    loopStates(character);

    runAnimation = setInterval(() => {
      loopStates(character);
    }, 5000);
  }, 3000);
}

// State iterator
// Is run within startAnimation()
function loopStates(char) {
  char.classList.remove('state-four');

  stateTwo = setTimeout(() => {
    char.classList.add('state-two')
  }, 1000);

  stateThree = setTimeout(() => {
    char.classList.remove('state-two');
    char.classList.add('state-three')
  }, 3000);

  stateFour = setTimeout(() => {
    char.classList.remove('state-three');
    char.classList.add('state-four')
  }, 4000);
}

// Clear all timers
function clearAnimation() {
  clearTimeout(delayAnimation);
  clearInterval(runAnimation);

  clearTimeout(stateTwo);
  clearTimeout(stateThree);
  clearTimeout(stateFour);
}

// ------------------------------------------------------
// ------------------ Initialize scene ------------------
// ------------------------------------------------------

function initChar() {
  let startChar = characterList[0];

  changeCharacter(startChar);
  wrap.classList.add('to-right');
  startAnimation();
}

initChar();