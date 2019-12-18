import React from 'react';
import { Button, Body, Header, Title, Left, Icon, Right } from 'native-base';

interface Props {
    callback: any;
    tabName: string;
}

export default class AppHeader extends React.Component<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Header>
                <Left>
                    <Button transparent onPress={this.props.callback}>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                    <Title>{this.props.tabName}</Title>
                </Body>
                <Right />
            </Header>
        );
    }
}
