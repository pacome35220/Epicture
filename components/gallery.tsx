import React from 'react';
import { StyleSheet, Text } from 'react-native';

class Gallery extends React.Component {
    render() {
        return (
            <Text>
                This is gallery tab
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
      }
})

export default Gallery
