import axios from 'axios';
import { ApiResponseGallery } from './ApiResponseInterface';

export class ImgurApi {
    private static instance: ImgurApi;

    getUserProfilePic = () => {
        return require('../assets/example_profile.png');
    };

    fetch = async (url: string) => {
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
    ): Promise<ApiResponseGallery[]> => {
        try {
            const filter = post => ({
                id: post.id,
                title: post.title,
                description: post.description,
                link: post.link,
                type: post.type,
                width: post.width,
                height: post.height,
                images: post.images && post.images.map(image => filter(image))
            });
            const res = await this.fetch(
                `/gallery/${section}/${sort}/${window}/${page}`
            );

            return res.data.data.map(post => filter(post));
        } catch (err) {
            console.warn(err);
            return [];
        }
    };

    static getInstance = (): ImgurApi => {
        if (!ImgurApi.instance) {
            ImgurApi.instance = new ImgurApi();
        }

        return ImgurApi.instance;
    };
}

// (async function() {
//     let mdr = ImgurApi.getInstance();

//     let tmp = await mdr.getImageGallery();

//     console.log(tmp[0]);
// })();
