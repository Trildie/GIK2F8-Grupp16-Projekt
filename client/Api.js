class Api {
    url = '';

    //När klassen skapas tar vi imot en url och sparar ner den lokalt.
    constructor(url){
        this.url = url;
    }


    //Metod för att skapa, dvs anropa POST
    create(data){
        const JSONData = JSON.stringify(data);
        console.log(`Sending ${JSONData} to ${this.url}`);

        const request = new Request(this.url,{
            method: 'POST',
            body: JSONData,
            headers: {
                'content-type': 'application/json'
            }
        });

        return(
            fetch(request)
            .then((result) => result.json())
            .then((data) => data)
            .catch((err) => console.log(err))
        );
    }

    //Read - GET metoden
    getAll() {
        return fetch(this.url)
          .then((result) => result.json())
          .then((data) => data)
          .catch((err) => console.log(err));
      }

    //Delete
    remove(id){
        console.log(`Tar bort spel med id ${id}`);

        return fetch(`${this.url}/${id}`, {
            method: 'DELETE'
        })
            .then((result) => result)
            .catch((err) => console.log(err));
    }

}