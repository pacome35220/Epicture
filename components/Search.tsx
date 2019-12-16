import React from 'react';
import { View, TextInput } from 'react-native';

class Search extends React.Component {
    searchText: string = '';

    constructor(props) {
        super(props);
        this.state = {
            searchResult: [],
            isLoading: false
        };
    }

    private onSearchInputChange(text) {
        this.searchText = text;
    }

    private searchImage() {
        // console.log(this.searchText);
    }

    render() {
        return (
            <View style={{ marginTop: 50 }}>
                <TextInput
                    placeholder='Search an image'
                    onChangeText={text => this.onSearchInputChange(text)}
                    onSubmitEditing={() => this.searchImage()}
                />
            </View>
        );
    }
}

export default Search;
