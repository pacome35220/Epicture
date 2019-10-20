/*
** It's a freaking singleton pattern
*/

import User from './User';

export class AuthManager {
    private static instance: AuthManager;

    private constructor() {}

    login(user: User, token: string) {
        //Login function using the imgur API
        user.token = token;
    }

    logout() {
        //Logout function using the imgur API
    }

    static getInstance(): AuthManager {
        if (!AuthManager.instance) {
            AuthManager.instance = new AuthManager();
        }

        return AuthManager.instance;
    }
}
