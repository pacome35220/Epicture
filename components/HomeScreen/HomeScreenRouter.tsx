import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import HomeScreen from './HomeScreen';
import Gallery from '../Gallery';
import Search from '../Search';
import UserProfile from '../UserProfile';

import SideBar from '../SideBar';

const HomeScreenRouter = createAppContainer(
    createDrawerNavigator(
        {
            Home: { screen: HomeScreen },
            Gallery: { screen: Gallery },
            Search: { screen: Search },
            UserProfile: { screen: UserProfile }
        },
        {
            contentComponent: props => <SideBar {...props} />
        }
    )
);
export default HomeScreenRouter;
