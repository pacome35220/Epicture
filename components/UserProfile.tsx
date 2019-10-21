import React from 'react'
import { Text, View, Image, ImageBackground, Dimensions } from 'react-native'

import { ImgurApi } from '../common/ImgurApi'

import { UserNavbar } from './Navbar'
import { User, OAuth2Response } from '../common/User'

const imgurApi = ImgurApi.getInstance();

class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            ImageBackground: {}
        };
    }

    async componentDidMount() {
        this.setState({ user: await User.get() });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <ImageBackground
                        style={{ width: Dimensions.get('window').width }}
                        source={{ uri: `https://imgur.com/user/${this.state.user.account_username}/cover` }}>
                        <Image
                            style={{ width: 100, height: 100, borderRadius: 100 }}
                            source={{ uri: `https://imgur.com/user/${this.state.user.account_username}/avatar` }}
                        />
                        <Text style={{ marginTop: 20 }}>
                            User description ?
                    </Text>
                    </ImageBackground>
                </View>
                <View style={{ flex: 4 }}>
                    <UserNavbar />
                </View>
            </View >
        )
    };
}

export default UserProfile
