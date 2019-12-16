enum GalleryPostType {
    MP4 = 'video/mp4',
    JPEG = 'image/jpeg',
    PNG = 'image/png'
}

export interface ApiResponseGallery {
    id: string;
    title: string;
    description: string;
    link: string;
    type: GalleryPostType;
    width: string;
    height: string;
    images?: ApiResponseGallery[];
}
