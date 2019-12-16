import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';

import Gallery from './Gallery';
import UserProfile from './UserProfile';
import Search from './Search';

import Posts from './profile/Posts';
import Favorites from './profile/Favorites';

const NavbarTab = createMaterialBottomTabNavigator({
    GalleryTab: {
        screen: Gallery,
        navigationOptions: {
            labeled: false,
            tabBarIcon: () => {
                return <Icon name='home' size={30} color='#FFFFFF' />;
            }
        }
    },
    SearchTab: {
        screen: Search,
        navigationOptions: {
            labeled: false,
            tabBarIcon: () => {
                return <Icon name='search' size={30} color='#FFFFFF' />;
            }
        }
    },
    UserProfileTab: {
        screen: UserProfile,
        navigationOptions: {
            labeled: false,
            tabBarIcon: () => {
                return <Icon name='user' size={30} color='#FFFFFF' />;
            }
        }
    }
});

const UserNavbarTab = createMaterialTopTabNavigator({
    PostsTab: {
        screen: Posts,
        navigationOptions: {
            tabBarLabel: 'Posts'
        }
    },
    FavoritesTab: {
        screen: Favorites,
        navigationOptions: {
            tabBarLabel: 'Favorites'
        }
    }
});

export const UserNavbar = createAppContainer(UserNavbarTab);

export const Navbar = createAppContainer(NavbarTab);
