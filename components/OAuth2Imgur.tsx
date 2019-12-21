import React from 'react';
import { WebView, WebViewNavigation } from 'react-native-webview';

import { User, OAuth2Response } from '../common/User';

interface Props {
    onLogged(user: OAuth2Response): void;
}

interface State {
    user: OAuth2Response;
}

const baseAuthURL = 'https://api.imgur.com/oauth2/authorize';

class OAuth2Imgur extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            user: {} as OAuth2Response
        };
    }

    async componentDidMount() {
        this.setState({ user: await User.get() });
    }

    getAuthURL(clientId: string) {
        return `${baseAuthURL}?response_type=token&client_id=${clientId}`;
    }

    parseAuthResponse(m: string[]): OAuth2Response {
        const regex = /(\?|\&|#)([^=]+)\=([^&]+)/;

        return {
            access_token: m[0].match(regex)[3],
            expires_in: m[1].match(regex)[3],
            token_type: m[2].match(regex)[3],
            refresh_token: m[3].match(regex)[3],
            account_username: m[4].match(regex)[3],
            account_id: m[5].match(regex)[3]
        };
    }

    parseResponseURL(url: string) {
        if (
            (!this.state.user ||
                Object.entries(this.state.user).length !== 6) &&
            url.split('&').length === 6
        ) {
            let user: OAuth2Response = this.parseAuthResponse(
                url.match(/(\?|\&|#)([^=]+)\=([^&]+)/g)
            );

            User.set(user);
            this.props.onLogged(user);
        }
    }

    render() {
        return (
            <WebView
                source={{
                    uri: this.getAuthURL(
                        require('../credentials.json').clientId
                    )
                }}
                onNavigationStateChange={(newNavState: WebViewNavigation) =>
                    this.parseResponseURL(newNavState.url)
                }
            />
        );
    }
}

export default OAuth2Imgur;
