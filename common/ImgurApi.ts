import { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import User from './User';

export class ImgurApi {
    private static instance: ImgurApi;
    private static axios = axios.create();

    private constructor() {
        console.log('constructor');
    }

    getUserProfilePic() {
        return require('../assets/example_profile.png');
    }

    getImageGallery() {
        let options = {
            headers: {
                Authorization:
                    'Client-ID' + require('../credentials.json').clientId
            }
        };
        return axios
            .get(
                'https://api.imgur.com/3/gallery/hot/viral/day/1?showViral=true&mature=false&album_previews=false',
                options
            )
            .then(response => {
                return response.data.data[5].images[0].link;
            });
    }

    static getInstance(): ImgurApi {
        if (!ImgurApi.instance) {
            ImgurApi.instance = new ImgurApi();
        }

        return ImgurApi.instance;
    }
}
