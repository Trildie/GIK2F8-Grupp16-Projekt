gameForm.title.addEventListener('keyup',(e)=> validateField(e.target));
gameForm.title.addEventListener('blur',(e)=> validateField(e.target));

gameForm.developer.addEventListener('input',(e)=> validateField(e.target));
gameForm.developer.addEventListener('blur',(e)=> validateField(e.target));

gameForm.releaseDate.addEventListener('input',(e)=> validateField(e.target));
gameForm.releaseDate.addEventListener('blur',(e)=> validateField(e.target));

gameForm.addEventListener("submit", onSubmit);

const gameListElement = document.getElementById('gameList');

let titleValid = true;
let developerValid = true;
let releaseDateValid = true;


const api = new Api('http://localhost:5000/games');


function validateField(field) {

  const { title, value } = field;

  let = validationMessage = '';
  switch (title) {

    case 'title': {
      if (value.length < 2) {
        titleValid = false;
        validationMessage = "Fältet 'title' måste innehålla minst 2 tecken.";
      } else if (value.length > 100) {
        titleValid = false;
        validationMessage =
          "Fältet 'title' får inte innehålla mer än 100 tecken.";
      } else {
        titleValid = true;
      }
      break;
    }
    case 'developer': {
      if (value.length > 500) {
        developerValid = false;
        validationMessage =
          "Fältet 'developer' får inte innehålla mer än 500 tecken.";
      } else {
        developerValid = true;
      }
      break;
    }
    case 'releaseDate': {
      if (value.length === 0) {
        releaseDateValid = false;
        validationMessage = "Fältet 'Slutförd senast' är obligatorisk.";
      } else {
        releaseDateValid = true;
      }
      break;
    }
  }
  

  field.previousElementSibling.innerText = validationMessage;
  field.previousElementSibling.classList.remove('hidden');
}

function onSubmit(e) {

  e.preventDefault();
  if (titleValid && developerValid && releaseDateValid) {
    
    console.log('Submit');

    saveGame();
  }
}

function saveGame() {
  const game = {
    title: gameForm.title.value,
    developer: gameForm.developer.value,
    releaseDate: gameForm.releaseDate.value,
    
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



function rendergame({ id, title, developer, releaseDate }) {
 

  
  let html = `
    <li class="select-none mt-2 py-2 border-b border-blue-300">
      <div class="flex items-center">
        <h3 class="mb-3 flex-1 text-xl font-bold text-sky-500 uppercase">${title}</h3>
        <div>
          <span>${releaseDate}</span>
          <button onclick="deleteGame(${id})" class="inline-block bg-blue-500 text-xs text-blue-900 border border-white px-3 py-1 rounded-md ml-2">Ta bort</button>
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
