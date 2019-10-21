import React from 'react'
import { Text, View, Image } from 'react-native'

import { ImgurApi } from '../common/ImgurApi'

import { UserNavbar } from './Navbar'
import { User, OAuth2Response } from '../common/User'

const imgurApi = ImgurApi.getInstance();

class UserProfile extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            user: {} as OAuth2Response
        }
    }

    async componentDidMount() {
        await this.setState({ user: await User.get() });
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                        style={{width: 100, height: 100, borderRadius: 100}}
                        source={imgurApi.getUserProfilePic()}
                    />
                    <Text style={{marginTop: 5}}>
                        {this.state.user.account_username}
                    </Text>
                </View>
                <View style={{flex: 4}}>
                    <UserNavbar/>
                </View>
            </View>
        )
    };
}

export default UserProfile
