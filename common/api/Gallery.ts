enum GalleryPostType {
    MP4 = 'video/mp4',
    JPEG = 'image/jpeg',
    PNG = 'image/png'
}

interface GalleryImage {
    id: string;
    title: string;
    description: string;
    type: GalleryPostType;
    width: string;
    height: string;
    link: string;
}

interface GalleryApiModel {
    id: string;
    title: string;
    description: string;
    link: string;
    images: GalleryImage[];
}

const galleryFilter = (post): GalleryApiModel => {
    if (!post.images) {
        return null;
    }
    return {
        id: post.id,
        title: post.title,
        description: post.description,
        link: post.link,
        images: post.images?.map(image => ({
            id: image.id,
            title: image.title,
            description: image.description,
            type: image.type,
            width: image.width,
            height: image.height,
            link: image.link
        }))
    };
};

export { GalleryImage, GalleryApiModel, galleryFilter };
