const URI = 'http://localhost/ApiKaraoke/public';

export default {
    async fetchVideos() {
        try {
                let response = await fetch(URI + '/api/videos');
                let responseJsonData = await response.json();
                return responseJsonData;
            }
        catch(e) {
            console.log(e)
        }
    }
}