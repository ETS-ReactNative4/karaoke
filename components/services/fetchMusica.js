import URL from '../config';
//const URI = 'http://192.168.0.101/ApiKaraoke/public/api/';
const URI = URL + '/ApiKaraoke/public/api/';

export default {
    async fetchMusica() {
        try {
                let response = await fetch(URI + 'temas');
                let responseJsonData = await response.json();
                return responseJsonData;
            }
        catch(e) {
            console.log(e)
        }
    },

async fetchAlbum(al) {
        try {
                let response = await fetch(URI + 'album/' + al);
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