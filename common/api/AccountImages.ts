import { GalleryImage } from './Gallery';

const accountImagesFilter = (image): GalleryImage => {
    return {
        id: image.id,
        title: image.title,
        description: image.description,
        type: image.type,
        width: image.width,
        height: image.height,
        link: image.link
    };
};

export { GalleryImage, accountImagesFilter };
