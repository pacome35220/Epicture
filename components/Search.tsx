import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import {
    Container,
    Header,
    Item,
    Icon,
    Input,
    Button,
    Text
} from 'native-base';

import { GalleryApiModel } from '../common/api/Gallery';
import { ImgurApi } from '../common/ImgurApi';

import AppHeader from './AppHeader';
import { GalleryPost } from './GalleryPost';

interface Props {
    navigation: {
        toggleDrawer(): void;
    };
}

interface State {
    images: GalleryApiModel[];
}

class Search extends React.Component<Props, State> {
    text: string;

    constructor(props) {
        super(props);
        this.state = {
            images: []
        };
    }

    async componentDidMount() {
        try {
        } catch (err) {
            console.warn(err);
        }
    }

    searchImage = async () => {
        try {
            const images = await ImgurApi.searchImage(this.text);

            this.setState({ images });
        } catch (err) {
            console.warn(err);
        }
    };

    render() {
        return (
            <Container>
                <AppHeader
                    tabName='Search'
                    callback={() => this.props.navigation.toggleDrawer()}
                />

                <Header searchBar rounded>
                    <Item>
                        <Icon name='ios-search' />
                        <Input
                            placeholder='Search'
                            ref='searchBar'
                            onChangeText={text => (this.text = text)}
                            onSubmitEditing={() => this.searchImage()}
                        />
                        <Button rounded onPress={() => this.searchImage()}>
                            <Icon name='ios-search' />
                        </Button>
                    </Item>
                </Header>

                {this.state.images.length ? (
                    <SafeAreaView>
                        <FlatList
                            data={this.state.images}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <GalleryPost post={item.images[0]} />
                            )}
                        />
                    </SafeAreaView>
                ) : (
                    <Text>No image corresponds to the search</Text>
                )}
            </Container>
        );
    }
}

export default Search;
