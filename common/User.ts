import AsyncStorage from '@react-native-community/async-storage';

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
            let tmp: string;

            try {
                tmp = await AsyncStorage.getItem('user');
            } catch (err) {
                console.log(err);
                return User.cache;
            }
            User.cache = JSON.parse(tmp);
            User.lastUpdate = now;
        }

        return User.cache;
    }

    static async set(user: OAuth2Response) {
        User.cache = user;
        await AsyncStorage.setItem('user', JSON.stringify(User.cache)).catch(err => console.log(err));
        User.triggerChange();
    }

    static async logout() {
        User.cache = null;
        await AsyncStorage.removeItem('user').catch(err => console.log(err));
        User.triggerChange();
    }

    static onChange(callback) {
        User.subscribers.push(callback);
    }
}

export default User
