import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import { CardItem, Text, Card } from 'native-base';

import Video from 'react-native-video';

import { GalleryImage, GalleryApiModel } from '../common/api/Gallery';

interface GalleryPostProps {
    post: GalleryApiModel;
}

export class GalleryPost extends React.Component<GalleryPostProps> {
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
