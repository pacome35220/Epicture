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

export default createAppContainer(NavbarTab)
