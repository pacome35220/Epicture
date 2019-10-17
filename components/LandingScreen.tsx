import React from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';

import User from '../common/User';

class LandingScreen extends React.Component {

    state = {
        user: {},
        done: false,
    }

    async componentDidMount() {
        await this.setState({ user: await User.get() });

        setTimeout(() => this.setState({ done: true }), 1500);
    }

    getAuthUrl(clientId) {
        return `https://api.imgur.com/oauth2/authorize?response_type=token` +
            `&client_id=${clientId}`
    }

    async login() {
        console.log('login button pressed');
        let user = this.state.user;

        if (!user) {
            user = this.getAuthUrl(require('../credentials.json').clientId),
                console.log(user);
            User.set(user);
            console.log('après l oauth2 on a :');
            console.log(user);
        } else {
            console.log('already logged as ' + user);
        }

        this.props.onLogged(user);
    }

    parseResponseURL(newNavState: WebViewNavigation) {
        console.log(newNavState)
    }

    run_webview: boolean = false;

    render() {
        return (
                <WebView
                    source={{ uri: this.getAuthUrl(require('../credentials.json').clientId) }}
                    onNavigationStateChange={this.parseResponseURL}
                    style={{marginTop: 20}}
                ></WebView>
        )
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
