import axios from 'axios';
import { GalleryApiModel, galleryFilter, GalleryImage } from './api/Gallery';
import { accountImagesFilter } from './api/AccountImages';

import User from './User';

export class ImgurApi {
    private static instance: ImgurApi;

    static getInstance = (): ImgurApi => {
        if (!ImgurApi.instance) {
            ImgurApi.instance = new ImgurApi();
        }

        return ImgurApi.instance;
    };

    private fetch = async (url: string) => {
        const user = await User.get();
        const config = {
            headers: {
                Authorization: `Bearer ${user.access_token}`
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
                .map(post => galleryFilter(post))
                .filter(elem => elem)
                .slice(0, 10);
        } catch (err) {
            console.warn(err);
            return [];
        }
    };

    getAccountImages = async (): Promise<GalleryImage[]> => {
        try {
            const res = await this.fetch(`/account/me/images`);

            return res.data.data
                .map(image => accountImagesFilter(image))
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
