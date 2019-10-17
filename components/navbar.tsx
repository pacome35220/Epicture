import React from 'react'
import { StyleSheet, View } from 'react-native'

class Navbar extends React.Component {
    render() {
        return (
            <View style= {styles.navbar}>
                <View style={{flex: 1, backgroundColor: 'blue'}}></View>
                <View style={{flex: 1, backgroundColor: 'green'}}></View>
                <View style={{flex: 1, backgroundColor: 'yellow'}}></View>
                <View style={{flex: 1, backgroundColor: 'black'}}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navbar: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'red'
    },
    item: {

    }
})

export default Navbar
