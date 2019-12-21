import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { Container, Spinner } from 'native-base';

import { ImgurApi } from '../common/ImgurApi';
import { GalleryApiModel } from '../common/api/Gallery';

import AppHeader from './AppHeader';
import { GalleryPost } from './GalleryPost';

interface State {
    images: GalleryApiModel[];
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
                            keyExtractor={(item, index) => index.toString()}
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

export default Gallery;
