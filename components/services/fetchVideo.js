import URL from '../config';
const URI = URL + '/ApiKaraoke/public/api/';
//const URI = 'http://192.168.0.101/ApiKaraoke/public/api/';

export default {

    async fetchVideos() {
        try {
                let response = await fetch(URI + 'videos');
                let responseJsonData = await response.json();
                return responseJsonData;
            }
        catch(e) {
            console.log(e)
        }
    },

    async fetchVideo(id) {
        try {
                let response = await fetch(URI + 'video/' + id);
                let responseJsonData = await response.json();
                return responseJsonData;
            }
        catch(e) {
            console.log(e)
        }
    },

    async fetchLastVideo() {
        try {
                let response = await fetch(URI + 'lastVideo/');
                let responseJsonData = await response.json();
                return responseJsonData;
            }
        catch(e) {
            console.log(e)
        }
    }
}