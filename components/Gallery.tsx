import React from 'react';
import {
    Image,
    FlatList,
    SafeAreaView,
    Dimensions,
    StyleSheet
} from 'react-native';
import { Container, CardItem, Text, Card, Spinner } from 'native-base';

import Video from 'react-native-video';

import { ImgurApi } from '../common/ImgurApi';
import { GalleryApiModel, GalleryImage } from '../common/api/Gallery';
import AppHeader from './AppHeader';

interface State {
    images: GalleryApiModel[];
}

interface GalleryPostProps {
    post: GalleryApiModel;
}

class GalleryPost extends React.Component<GalleryPostProps> {
    getDataTag(image: GalleryImage) {
        if (image.type === 'video/mp4') {
            return (
                <Video
                    resizeMode='contain'
                    source={{ uri: image.link }}
                    style={styles.galleryVideo}
                />
            );
        } else {
            return (
                <Image
                    source={{ uri: image.link }}
                    style={styles.galleryImage}
                />
            );
        }
    }

    render() {
        const { post } = this.props;

        console.log('Gallery currently rendering: ', post);
        return (
            <Card style={styles.galleryCard}>
                <CardItem>
                    <Text>{post.title}</Text>
                </CardItem>
                <CardItem cardBody>{this.getDataTag(post.images[0])}</CardItem>
                {post.description ? (
                    <CardItem>
                        <Text>{post.description}</Text>
                    </CardItem>
                ) : null}
            </Card>
        );
    }
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

            this.setState({ images });
        } catch (err) {
            console.warn(err);
        }
    }

    render() {
        return (
            <Container>
                <AppHeader
                    tabName='Gallery'
                    callback={this.props.navigation.toggleDrawer}
                />
                {!this.state.images.length ? (
                    <Spinner />
                ) : (
                    <SafeAreaView>
                        <FlatList
                            data={this.state.images}
                            keyExtractor={(item, index) => index.toFixed()}
                            renderItem={({ item }) => (
                                <GalleryPost post={item} />
                            )}
                        />
                    </SafeAreaView>
                )}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    galleryCard: {
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20
    },
    galleryImage: {
        width: Dimensions.get('window').width - 20 - 20,
        height: Dimensions.get('window').height,
        resizeMode: 'contain'
    },
    galleryVideo: {
        width: Dimensions.get('window').width - 20 - 20,
        height: Dimensions.get('window').height
    }
});

export default Gallery;
