import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

import { ImgurApi } from '../common/ImgurApi'
import { NullConsole } from '@jest/console';

const galleryUrl = 'https://api.imgur.com/3/gallery/hot/viral/day/1?showViral=true&mature=false&album_previews=false'

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            image: '',
            imageIsLoading: true
        }
    }

    componentDidMount() {
        this.fetchGalleryImages()
    }

    private async fetchGalleryImages() {
        ImgurApi.getInstance().getImageGallery().then((images) => {
            this.setState({image: images})
            this.setState({imageIsLoading: false})
        })
    }

    render() {
        if (this.state.imageIsLoading == false) {
            console.log(this.state.image)
            return (
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <Image
                        style={{width: Dimensions.get('window').width, height: Dimensions.get('window').width}}
                        source={{uri: this.state.image}}
                    >
                    </Image>
                </View>
            )
        } else {
            return (
                <Text>BITE</Text>
            )
        }
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
