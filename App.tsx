import React from 'react';
import { StyleSheet, View } from 'react-native';

import LandingScreen from './components/LandingScreen';
import { Navbar } from './components/Navbar';

import { User, OAuth2Response } from './common/User';

export default class App extends React.Component {
    state = {
        isLoadingComplete: false,
        user: {} as OAuth2Response
    };

    componentDidMount() {
        User.onChange((user: OAuth2Response) => this.setState({ user }));
        this._loadResourcesAsync()
            .then(this._handleFinishLoading)
            .catch(this._handleLoadingError);
    }

    _loadResourcesAsync = async () => {
        this.setState({ user: await User.get() });
    };

    _handleLoadingError = error => console.warn(error);

    _handleFinishLoading = () => this.setState({ isLoadingComplete: true });

    render() {
        if (this.state.user && Object.entries(this.state.user).length == 6)
            return (
                <View style={styles.container}>
                    <Navbar />
                </View>
            );
        else
            return <LandingScreen onLogged={user => this.setState({ user })} />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});
