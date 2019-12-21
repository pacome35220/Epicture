import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { Container, Spinner } from 'native-base';

import { GalleryImage } from '../common/api/Gallery';
import { ImgurApi } from '../common/ImgurApi';

import AppHeader from './AppHeader';
import { GalleryPost } from './GalleryPost';

interface Props {
    navigation: {
        toggleDrawer(): void;
    };
}

interface State {
    images: GalleryImage[];
}

class UserProfile extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        };
    }

    async componentDidMount() {
        try {
            const images = await ImgurApi.getInstance().getAccountImages();

            this.setState({ images });
        } catch (err) {
            console.warn(err);
        }
    }

    render() {
        return (
            <Container>
                <AppHeader
                    tabName='Profile'
                    callback={() => this.props.navigation.toggleDrawer()}
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

export default UserProfile;
