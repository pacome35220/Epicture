import React from 'react';
import { Text, Image, FlatList, StyleSheet, View } from 'react-native';
import { Button, Icon, ListItem, Container, Header } from 'native-base';

import { User, OAuth2Response } from '../common/User';

interface State {
    user: OAuth2Response;
}

const routes = ['Gallery', 'Search', 'Profile'];

export default class SideBar extends React.Component<any, State> {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

    async componentDidMount() {
        this.setState({ user: await User.get() });
    }

    getSideBarHeader() {
        return (
            <>
                <Image
                    source={{
                        uri: `https://imgur.com/user/${this.state.user.account_username}/cover`
                    }}
                    style={styles.headerBackground}
                />
                <Image
                    style={styles.headerIcon}
                    source={{
                        uri: `https://imgur.com/user/${this.state.user.account_username}/avatar`
                    }}
                />
                <Button
                    transparent
                    onPress={() => this.props.navigation.toggleDrawer()}>
                    <Icon name='menu' />
                </Button>
                <Text style={styles.username}>
                    {this.state.user.account_username}
                </Text>
            </>
        );
    }

    render() {
        return (
            <View>
                {this.getSideBarHeader()}
                <FlatList
                    data={routes}
                    contentContainerStyle={{ marginTop: 120 }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <ListItem
                            onPress={() => {
                                this.props.navigation.navigate(item);
                            }}>
                            <Text>{item}</Text>
                        </ListItem>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerBackground: {
        height: 120,
        width: '100%',
        alignSelf: 'stretch',
        position: 'absolute'
    },
    headerIcon: {
        height: 80,
        width: 70,
        position: 'absolute',
        alignSelf: 'center',
        borderRadius: 100,
        top: 25
    },
    username: {
        color: 'white',
        alignSelf: 'center',
        position: 'absolute'
    }
});
