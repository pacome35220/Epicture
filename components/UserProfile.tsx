import React from 'react';

import AppHeader from './AppHeader';
import User from '../common/User';
import { Container } from 'native-base';

class UserProfile extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            ImageBackground: {}
        };
    }

    async componentDidMount() {
        this.setState({ user: await User.get() });
    }

    render() {
        return (
            <Container>
                <AppHeader
                    tabName='Profile'
                    callback={this.props.navigation.toggleDrawer}
                />
            </Container>
        );
    }
}

export default UserProfile;
