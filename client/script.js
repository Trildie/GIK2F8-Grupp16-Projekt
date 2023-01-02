gameForm.name.addEventListener('keyup',(e)=> validateField(e.target));
gameForm.name.addEventListener('blur',(e)=> validateField(e.target));

gameForm.developer.addEventListener('input',(e)=> validateField(e.target));
gameForm.developer.addEventListener('blur',(e)=> validateField(e.target));

gameForm.releaseDate.addEventListener('input',(e)=> validateField(e.target));
gameForm.releaseDate.addEventListener('blur',(e)=> validateField(e.target));






const gameListElement = document.getElementById('gameList');

let nameValid = true;
let descriptionValid = true;
let releaseDateValid = true;


const api = new Api('http://localhost:5000/games');


function validateField(field) {

  const { name, value } = field;

  let = validationMessage = '';
  switch (name) {

    case 'name': {
      if (value.length < 2) {
        nameValid = false;
        validationMessage = "Fältet 'name' måste innehålla minst 2 tecken.";
      } else if (value.length > 100) {
        nameValid = false;
        validationMessage =
          "Fältet 'name' får inte innehålla mer än 100 tecken.";
      } else {
        nameValid = true;
      }
      break;
    }
    case 'developer': {
      if (value.length > 500) {
        descriptionValid = false;
        validationMessage =
          "Fältet 'developer' får inte innehålla mer än 500 tecken.";
      } else {
        descriptionValid = true;
      }
      break;
    }
    case 'releaseDate': {
      if (value.length === 0) {
        releaseDateValid = false;
        validationMessage = "Fältet 'Slutförd senast' är obligatorisk.";
      } else {
        release6DateValid = true;
      }
      break;
    }
  }
  

  field.previousElementSibling.innerText = validationMessage;
  field.previousElementSibling.classList.remove('hidden');
}

function onSubmit(e) {

  e.preventDefault();
  if (nameValid && developerValid && releaseDateValid) {
    
    console.log('Submit');

    saveGame();
  }
}

function saveGame() {
  const game = {
    name: gameForm.name.value,
    developer: gameForm.developer.value,
    releaseDate: gameForm.releaseDate.value,
    completed: false
  };
  
  api.create(game).then((game) => {
    if (game) {
      renderList();
    }
  });
}

function renderList() {
  console.log('rendering');

  api.getAll().then((games) => {
    
    gameListElement.innerHTML = '';

    
    if (games && games.length > 0) {
      
      games.forEach((game) => {
       
        gameListElement.insertAdjacentHTML('beforeend', rendergame(game));
      });
    }
  });
}



function rendergame({ id, name, developer, releaseDate }) {
 

  
  let html = `
    <li class="select-none mt-2 py-2 border-b border-amber-300">
      <div class="flex items-center">
        <h3 class="mb-3 flex-1 text-xl font-bold text-pink-800 uppercase">${name}</h3>
        <div>
          <span>${releaseDate}</span>
          <button onclick="deleteGame(${id})" class="inline-block bg-amber-500 text-xs text-amber-900 border border-white px-3 py-1 rounded-md ml-2">Ta bort</button>
        </div>
      </div>`;


  developer &&

    (html += `
      <p class="ml-8 mt-2 text-xs italic">${developer}</p>
  `);

  html += `
    </li>`;

  return html;
}


function deleteGame(id) {
  
  api.remove(id).then((result) => {
    

    renderList();
   
  });
}


renderList();
