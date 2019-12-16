import React from 'react';
import { WebView, WebViewNavigation } from 'react-native-webview';

import { User, OAuth2Response } from '../common/User';

interface Props {
    onLogged(user: OAuth2Response): void;
}

interface State {
    user: OAuth2Response;
    logged: boolean;
}

class OAuth2Imgur extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            logged: false
        };
    }

    async componentDidMount() {
        this.setState({ user: await User.get() });
    }

    getAuthUrl(clientId: string) {
        return (
            `https://api.imgur.com/oauth2/authorize?response_type=token` +
            `&client_id=${clientId}`
        );
    }

    parseResponseURL(url: string) {
        let user = this.state.user;

        if (!user || !Object.entries(user).length) {
            if (url.split('&').length != 6) return null;
            const array = url.match(/(\?|\&|#)([^=]+)\=([^&]+)/g);
            let res: OAuth2Response = {};

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
                    source={{
                        uri: this.getAuthUrl(
                            require('../credentials.json').clientId
                        )
                    }}
                    onNavigationStateChange={(newNavState: WebViewNavigation) =>
                        this.parseResponseURL(newNavState.url)
                    }
                    style={{ marginTop: 20 }}
                />
            );
        else return null;
    }
}

export default OAuth2Imgur;
