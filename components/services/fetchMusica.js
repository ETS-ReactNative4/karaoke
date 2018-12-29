import URL from '../config';
//const URI = 'http://192.168.0.101/ApiKaraoke/public/api/';
//const URI = URL + '/ApiKaraoke/public/api/';
const URI = URL + '/public/api/';

export default {
    async fetchMusica() {
        try {
                let response = await fetch(URI + 'musica');
                let responseJsonData = await response.json();
                return responseJsonData;
            }
        catch(e) {
            console.log(e)
        }
    },

async fetchTemas(au, id) {
        try {
                let response = await fetch(URI + 'temas/' + au + '/' + id);
                let responseJsonData = await response.json();
                return responseJsonData;
            }
        catch(e) {
            console.log(e)
        }
    },

async fetchAutor(au) {
        try {
                let response = await fetch(URI + 'autor/' + au);
                let responseJsonData = await response.json();
                return responseJsonData;
            }
        catch(e) {
            console.log(e)
        }
    },

async fetchRadio() {
        try {
                let response = await fetch(URI + 'radio');
                let responseJsonData = await response.json();
                return responseJsonData;
            }
        catch(e) {
            console.log(e)
        }
    },

async fetchTema(id) {
        try {
                let response = await fetch(URI + 'tema/' + id);
                let responseJsonData = await response.json();
                return responseJsonData;
            }
        catch(e) {
            console.log(e)
        }
}
}