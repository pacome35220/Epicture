import React from 'react'
import { Text, View } from 'react-native'

class UserProfile extends React.Component {
    render() {
        return(
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <Text>
                    This is User-Profile tab
                </Text>
            </View>
        )
    };
}

export default UserProfile
