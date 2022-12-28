const express = require('express');

const app = express();

const fs = require('fs/promises');

const PORT = 5000;

app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");

    next();
  });

/* .get tar imot en route dit man skickar förfrågan.*/
//app.get('/games', async (req, res) => {
//  try {
//    console.log("shitty nodeman");
    //Försöker läsa in från filen games.json
//    const games = await fs.readFile('./games.json');
//    res.send(JSON.parse(games)); //Skickar tillbaka det inlästa från filen men parsat med json.
//  } catch (error) {
//    res.status(500).send({ error }); //om ett error skicka status kod 500
//  }
//});
//post för att lägga till nya spel, kollar också id så att flera inte kan använda samma id

app.get('/games', async (req, res) => {
  const games = await fs.readFile('./games.json');
  res.send(games);
});



app.post('/games', async (req, res) => {
  try {
    const games = req.body;
    const listBuffer = await fs.readFile("./games.json");
    const currentGames = JSON.parse(listBuffer);
    let maxGameId = 1;
    if (currentGames && currentGames.length > 0) {
      maxGameID = currentGames.reduce(
        (maxId, currentElement) =>
          currentElement.id > maxId ? currentElement.id : maxId,
        maxGameId
      ); //ifsats som håller koll på att man inte duplicerar idn
    }
    const newGame = { id: maxGameId + 1, ...games };
    const newList = currentGames ? [...currentGames, newGame] : [newGame];

    await fs.writeFile("./Games.json", JSON.stringify(newList));
    res.send(newGame);
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }
});

//Delete med /:id  tilllagt för att vi är ute efter ett specifikt id.
app.delete("/games/:id", async (req, res) => {
  try {
    const id = req.params.id; //hämtar id från inskickade datan.
    const listBuffer = await fs.readFile("./games.json");
    const currentGames = JSON.parse(listBuffer); //sätter currentGames till en parsad version av listbuffer.

    if (currentGames.length > 0) {
      //checkar att den är längre än 0, dvs inte tom.
      //Skriver över filen med allt förutom det id vi vill ta bort.
      await fs.writeFile(
        "./games.json",
        JSON.stringify(currentGames.filter((game) => game.id != id))
      );
      res.send({ message: `Spelet med id ${id} togs bort` });
    } else {
      res.status(404).send({ error: "Inget spel att ta bort" });
    }
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }
});

app.listen(PORT, () => console.log("Server running on http://localhost:5000"));

