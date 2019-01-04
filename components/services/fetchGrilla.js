import URL from '../config';
//const URI = 'http://192.168.0.101/ApiKaraoke/public/api/';
//const URI = URL + '/ApiKaraoke/public/api/';
const URI = URL + 'public/api/';

export default {
    async fetchGrilla() {
        try {
                let response = await fetch(URI + 'grilla');
                let responseJsonData = await response.json();
                return responseJsonData;
            }
        catch(e) {
            console.log(e)
        }
    },

async fetchVotos() {
        try {
                let response = await fetch(URI + 'votos/');
                let responseJsonData = await response.json();
                return responseJsonData;
            }
        catch(e) {
            console.log(e)
        }
    },

async fetchVoto(id) {
        try {
                let response = await fetch(URI + 'voto/' + id);
                let responseJsonData = await response.json();
                return responseJsonData;
            }
        catch(e) {
            console.log(e)
        }
}
}