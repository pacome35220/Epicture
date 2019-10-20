export class ImgurApi {
    private static instance: ImgurApi;

    private constructor() {
        console.log('constructor')
    }

    getUserProfilePic() {
        return (require('../assets/example_profile.png'))
    }

    static getInstance(): ImgurApi {
        if (!ImgurApi.instance) {
            ImgurApi.instance = new ImgurApi();
        }

        return ImgurApi.instance;
    }
}
