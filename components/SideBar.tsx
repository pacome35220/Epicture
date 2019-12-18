import React from 'react';
import { View, Image, FlatList, StyleSheet } from 'react-native';
import { Text, Button, Icon, ListItem } from 'native-base';

const routes = ['Gallery', 'Search', 'UserProfile'];

export default class SideBar extends React.Component<any> {
    render() {
        return (
            <View>
                <Image
                    source={{
                        uri:
                            'https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/drawer-cover.png'
                    }}
                    style={styles.headerBackground}
                />
                <Image
                    style={styles.headerIcon}
                    source={{
                        uri:
                            'https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/logo.png'
                    }}
                />
                <Button
                    transparent
                    onPress={() => this.props.navigation.toggleDrawer()}>
                    <Icon name='menu' />
                </Button>
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
        top: 20
    }
});
