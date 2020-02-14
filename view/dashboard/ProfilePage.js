import React, { Component } from 'react';
import {StyleSheet, Text} from "react-native";
import {FooterTabs} from "../Footer";
import {Container} from "native-base";

export class ProfilePage extends Component {
    render() {
        return (
            <Container>
                <Container style={styles.container}>
                    <Text>Welcome to the Profile Page it's currently under construction !</Text>
                </Container>
                <FooterTabs navigation={this.props.navigation}/>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
