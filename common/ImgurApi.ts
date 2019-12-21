import axios from 'axios';
import { GalleryApiModel, galleryFilter, GalleryImage } from './api/Gallery';
import { accountImagesFilter } from './api/AccountImages';

import User from './User';

export class ImgurApi {
    static fetch = async (url: string) => {
        const user = await User.get();
        const config = {
            headers: {
                Authorization: `Bearer ${user.access_token}`
            }
        };

        return await axios.get(`https://api.imgur.com/3/${url}`, config);
    };

    static getImageGallery = async (
        section = 'hot',
        sort = 'viral',
        window = 'day',
        page = 1
    ): Promise<GalleryApiModel[]> => {
        try {
            const res = await ImgurApi.fetch(
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

    static getAccountImages = async (): Promise<GalleryImage[]> => {
        try {
            const res = await ImgurApi.fetch(`/account/me/images`);

            return res.data.data
                .map(image => accountImagesFilter(image))
                .slice(0, 10);
        } catch (err) {
            console.warn(err);
            return [];
        }
    };

    static searchImage = async (
        image: string,
        sort = 'time',
        window = 'all',
        page = 1
    ): Promise<GalleryApiModel[]> => {
        try {
            const res = await ImgurApi.fetch(
                `/gallery/search/${sort}/${window}/${page}?q=${image}`
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
}

// (async function() {
//     let mdr = ImgurApi.getInstance();

//     let tmp = await mdr.getImageGallery();

//     console.log(tmp);
// })();
