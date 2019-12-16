import React from 'react';
import { Text, Image, View, FlatList, SafeAreaView } from 'react-native';
import { Container } from 'native-base';

import Video from 'react-native-video';

import { ImgurApi } from '../common/ImgurApi';
import { ApiResponseGallery } from '../common/ApiResponseInterface';
import AppHeader from './AppHeader';

interface State {
    images: ApiResponseGallery[];
}

class Gallery extends React.Component<any, State> {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        };
    }

    async componentDidMount() {
        try {
            const images = await ImgurApi.getInstance().getImageGallery();

            this.setState(prevState => ({
                images: [...prevState.images, ...images]
            }));
        } catch (err) {
            console.warn(err);
        }
    }

    render() {
        if (!this.state.images.length) {
            return <Text>Loading</Text>;
        }
        return (
            <Container>
                <AppHeader
                    tabName='gallery'
                    callback={this.props.navigation.toggleDrawer}
                />
                <SafeAreaView>
                    <FlatList
                        data={this.state.images}
                        renderItem={({ item }) => {
                            console.log('Gallery currently rendering: ', item);

                            // return <Text> {item.link} </Text>;

                            if (item.images[0].type === 'video/mp4') {
                                return (
                                    <Video
                                        source={{
                                            uri: item.images[0].link
                                        }}
                                    />
                                );
                            } else {
                                console.log(item.images[0].link);
                                // return <Text> {item.images[0].link} </Text>;
                                return (
                                    <View>
                                        <Image
                                            style={{
                                                width: item.images[0].width,
                                                height: item.images[0].height
                                            }}
                                            source={{
                                                uri: item.images[0].link
                                            }}
                                        />
                                    </View>
                                );
                            }
                        }}
                    />
                </SafeAreaView>
            </Container>
        );
    }
}

export default Gallery;
