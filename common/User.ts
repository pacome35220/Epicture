import { AsyncStorage } from 'react-native';

export interface OAuth2Response {
    access_token?: string
    expires_in?: string
    token_type?: string
    refresh_token?: string
    account_username?: string
    account_id?: string
}

export class User {
    static lastUpdate: number = 0;
    static cache: OAuth2Response;
    static subscribers = [];
    static triggerChange = () => User.subscribers.forEach(f => f(User.cache));

    token: string = '';

    static async get(): Promise<OAuth2Response> {
        const now: number = Date.now();

        if (now - User.lastUpdate > 60 * 60 * 1000) { // 1 hour
            User.cache = JSON.parse(await AsyncStorage.getItem('user'));
            User.lastUpdate = now;
        }

        return User.cache;
    }

    static async set(user: OAuth2Response) {
        User.cache = user;
        await AsyncStorage.setItem('user', JSON.stringify(User.cache));
        User.triggerChange();
    }

    static async logout() {
        User.cache = null;
        await AsyncStorage.removeItem('user');
        User.triggerChange();
    }

    static onChange(callback) {
        User.subscribers.push(callback);
    }
}
