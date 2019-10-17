import { AsyncStorage } from 'react-native';

class User {
    static lastUpdate: number = 0;
    static cache = {};
    static subscribers = [];
    static triggerChange = () => User.subscribers.forEach(f => f(User.cache));

    token = '';

    static async get() {
        const now: number = Date.now();

        if (now - User.lastUpdate > 60 * 60 * 1000) { // 1 hour
            User.cache = JSON.parse(await AsyncStorage.getItem('user'));
            User.lastUpdate = now;
        }

        return User.cache;
    }

    static async set(user) {
        User.cache = user;
        await AsyncStorage.setItem('user', JSON.stringify(User.cache));
        // User.triggerChange();
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

export default User
