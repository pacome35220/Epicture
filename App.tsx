import React from 'react';
import { StyleSheet, View } from 'react-native';

import OAuth2Imgur from './components/OAuth2Imgur';
import HomeScreenRouter from './components/HomeScreen/HomeScreenRouter';

import { User, OAuth2Response } from './common/User';

interface State {
    isLoadingComplete: boolean;
    user: OAuth2Response;
}

export default class App extends React.Component<any, State> {
    state = {
        isLoadingComplete: false,
        user: {}
    };

    async componentDidMount() {
        User.onChange((user: OAuth2Response) => this.setState({ user }));
        try {
            this.setState({ user: await User.get() });
            this.setState({ isLoadingComplete: true });
        } catch (err) {
            console.warn(err);
        }
    }

    render() {
        if (this.state.user && Object.entries(this.state.user).length == 6) {
            return (
                <View style={styles.container}>
                    <HomeScreenRouter />
                </View>
            );
        } else {
            return <OAuth2Imgur onLogged={user => this.setState({ user })} />;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});
