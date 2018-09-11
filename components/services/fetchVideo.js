const URI = 'http://192.168.0.101/ApiKaraoke/public/api/';

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
    }
}