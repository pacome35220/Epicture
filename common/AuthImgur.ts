import Imgur from './Imgur';
import { User, OAuth2Response } from './User';

export default class extends Imgur {
    constructor(access_token: string) {
        const clientId: string = require('../credentials.json').clientId;

        super(clientId, access_token);
        User.onChange((user: OAuth2Response) =>
            user ? this.login(user.access_token) : this.logout()
        );
    }
}
