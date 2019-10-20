import React from 'react'
import { Text } from 'react-native'

class UserProfile extends React.Component {
    render() {
        return(
            <Text style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                This is User-Profile tab
            </Text>
        )
    };
}

export default UserProfile
