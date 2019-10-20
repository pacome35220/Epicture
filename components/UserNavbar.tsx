import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Posts from './profile/Posts'
import Favorites from './profile/Favorites'

const UserNavbarTab = createMaterialTopTabNavigator ({
    PostsTab: {
        screen: Posts,
        navigationOptions: {
            tabBarLabel: 'Posts',
        }
    },
    FavoritesTab: {
        screen: Favorites,
        navigationOptions: {
            tabBarLabel: 'Favorites',
        }
    }
});

const UserNavbar = createAppContainer(UserNavbarTab)

export default UserNavbar
