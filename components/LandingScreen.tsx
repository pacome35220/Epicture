import React from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';

import User from '../common/User';

class LandingScreen extends React.Component {

    state = {
        user: {},
        logged: false,
    }

    async componentDidMount() {
        await this.setState({ user: await User.get() });
    }

    getAuthUrl(clientId) {
        return `https://api.imgur.com/oauth2/authorize?response_type=token` +
            `&client_id=${clientId}`
    }

    // async login() {
    //     console.log('login button pressed');
    //     let user = this.state.user;

    //     if (!user) {
    //         user = this.getAuthUrl(require('../credentials.json').clientId),
    //             console.log(user);
    //         console.log('après l oauth2 on a :');
    //         console.log(user);
    //     } else {
    //         console.log('already logged as ' + user);
    //     }

    // }

    parseResponseURL(newNavState: WebViewNavigation) {
        let user = this.state.user;

        if (!user) {
            console.log(newNavState.url)
            User.set(newNavState.url);
        }
        this.state.logged = true;
        this.props.onLogged(user);
    }

    run_webview: boolean = false;

    render() {
        if (!this.state.logged)
            return (
                <WebView
                    source={{ uri: this.getAuthUrl(require('../credentials.json').clientId) }}
                    onNavigationStateChange={this.parseResponseURL}
                    style={{ marginTop: 20 }}
                ></WebView>
            );
        else
            return null;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        margin: "0 200 0 200"
    }
});

export default LandingScreen
