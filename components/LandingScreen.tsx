import React from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';

import { User } from '../common/User';

class LandingScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            logged: false
        };
    }

    async componentDidMount() {
        await this.setState({ user: await User.get() });
    }

    getAuthUrl(clientId) {
        return `https://api.imgur.com/oauth2/authorize?response_type=token` +
            `&client_id=${clientId}`
    }

    parseResponseURL(url: string) {
        let user = this.state.user;

        if (!user) {
            if (url.split('&').length != 6)
                return null;
            const array = url.match(/(\?|\&|#)([^=]+)\=([^&]+)/g);
            let res = {};

            array.forEach((elem: string) => {
                const tmp = elem.match(/(\?|\&|#)([^=]+)\=([^&]+)/);

                res[tmp[2]] = tmp[3];
            });
            User.set(res);
        }
        this.setState({
            logged: true
        });
        this.props.onLogged(user);
    }

    render() {
        if (!this.state.logged)
            return (
                <WebView
                    source={{ uri: this.getAuthUrl(require('../credentials.json').clientId) }}
                    onNavigationStateChange={(newNavState: WebViewNavigation) =>
                        this.parseResponseURL(newNavState.url)
                    }
                    style={{ marginTop: 20 }}
                ></WebView>
            );
    }
}

export default LandingScreen
