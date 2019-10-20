import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import Icon from 'react-native-vector-icons/FontAwesome';

import Gallery from './Gallery'
import UserProfile from './UserProfile'
import Search from './Search'

const NavbarTab = createMaterialBottomTabNavigator ({
    GalleryTab: {
        screen: Gallery,
        navigationOptions: {
            labeled: false,
            tabBarIcon: () => {
                return <Icon name='home' size={30} color='#FFFFFF'></Icon>
            }
        }
    },
    SearchTab: {
        screen: Search,
        navigationOptions: {
            labeled: false,
            tabBarIcon: () => {
                return <Icon name='search' size={30} color='#FFFFFF'></Icon>
            }
        }
    },
    UserProfileTab: {
        screen: UserProfile,
        navigationOptions: {
            labeled: false,
            tabBarIcon: () => {
                return <Icon name='user' size={30} color='#FFFFFF'></Icon>
            }
        }
    }
});

const Navbar = createAppContainer(NavbarTab)

export default Navbar
