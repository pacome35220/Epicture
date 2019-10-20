import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import Gallery from '../components/gallery'
import UserProfile from '../components/UserProfile'

const NavbarTab = createMaterialBottomTabNavigator({
    GalleryTab: { screen: Gallery },
    UserProfileTab: { screen: UserProfile } ,
});

class Navbar extends React.Component {
    render() {
        return (
            <View style= {styles.navbar}>
                <View style={{flex: 1, backgroundColor: 'blue'}}></View>
                <View style={{flex: 1, backgroundColor: 'green'}}></View>
                <View style={{flex: 1, backgroundColor: 'yellow'}}></View>
                <View style={{flex: 1, backgroundColor: 'black'}}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navbar: {
        height: 100,
        flexDirection: 'row',
        backgroundColor: 'red'
    },
    item: {

    }
})

export default createAppContainer(NavbarTab)
