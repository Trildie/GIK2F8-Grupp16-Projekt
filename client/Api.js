class Api {
    url = '';

    //När klassen skapas tar vi imot en url och sparar ner den lokalt.
    constructor(url){
        this.url = url;
    }


    //Metod för att skapa, dvs anropa POST
    create(data){
        const JSONData = JSON.stringify(data);

    }

    //Read - GET metoden
    getAll() {
        return fetch(this.url)
          .then((result) => result.json())
          .then((data) => data)
          .catch((err) => console.log(err));
      }

}