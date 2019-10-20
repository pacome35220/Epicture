import React from 'react'
import { Text, View, Image } from 'react-native'

import { ImgurApi } from '../common/ImgurApi'

import UserNavbar from './UserNavbar'

const imgurApi = ImgurApi.getInstance();

class UserProfile extends React.Component {
    render() {
        return(
            <View style={{flex: 1}}>
                <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                        style={{width: 100, height: 100, borderRadius: 100}}
                        source={imgurApi.getUserProfilePic()}
                    />
                    <Text style={{marginTop: 20}}>
                        User description ?
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
