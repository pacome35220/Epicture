import React from 'react';
import { View, TextInput } from 'react-native';

import User, { OAuth2Response } from '../common/User';

import AppHeader from './AppHeader';

interface Props {
    navigation: {
        toggleDrawer(): void;
    };
}

interface State {
    user: OAuth2Response;
}

class Search extends React.Component<Props, State> {
    searchText: string = '';

    constructor(props) {
        super(props);
        this.state = {
            user: {} as OAuth2Response
        };
    }

    async componentDidMount() {
        this.setState({ user: await User.get() });
    }

    private onSearchInputChange(text) {
        this.searchText = text;
    }

    private searchImage() {
        // console.log(this.searchText);
    }

    render() {
        return (
            <View style={{ marginTop: 50 }}>
                <AppHeader
                    tabName='Gallery'
                    callback={() => this.props.navigation.toggleDrawer()}
                />
                <TextInput
                    placeholder='Search an image'
                    onChangeText={text => this.onSearchInputChange(text)}
                    onSubmitEditing={() => this.searchImage()}
                />
            </View>
        );
    }
}

export default Search;
