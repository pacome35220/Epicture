import axios from 'axios';
import { GalleryApiModel, GalleryFilter } from './api/Gallery';

export class ImgurApi {
    private static instance: ImgurApi;

    static getInstance = (): ImgurApi => {
        if (!ImgurApi.instance) {
            ImgurApi.instance = new ImgurApi();
        }

        return ImgurApi.instance;
    };

    getUserProfilePic = () => {
        return require('../assets/example_profile.png');
    };

    private fetch = async (url: string) => {
        const config = {
            headers: {
                Authorization:
                    'Client-ID ' + require('../credentials.json').clientId
            }
        };

        return await axios.get(`https://api.imgur.com/3/${url}`, config);
    };

    getImageGallery = async (
        section = 'hot',
        sort = 'viral',
        window = 'day',
        page = 1
    ): Promise<GalleryApiModel[]> => {
        try {
            const res = await this.fetch(
                `/gallery/${section}/${sort}/${window}/${page}`
            );

            return res.data.data
                .map(post => GalleryFilter(post))
                .filter(elem => elem)
                .slice(0, 10);
        } catch (err) {
            console.warn(err);
            return [];
        }
    };
}

// (async function() {
//     let mdr = ImgurApi.getInstance();

//     let tmp = await mdr.getImageGallery();

//     console.log(tmp);
// })();
