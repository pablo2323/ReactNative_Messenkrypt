import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left } from 'native-base';
import {StyleSheet} from "react-native";

export class FooterTabs extends Component {
    constructor(props) {
        super(props);
    }

    navigateTo(url: string){
        console.log(this.props.navigation.navigate(url));
    }

    render() {
        return (
            <Container>
                <Content />
                <Footer >
                    <FooterTab>
                        <Button vertical>
                            <Left>
                                <Icon name="globe" onPress={() => this.navigateTo('Dashboard')}/>
                            </Left>
                            <Text>Articles</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="navigate" onPress={() => this.navigateTo('ShowProductsPage')}/>
                            <Text>Products</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="camera" onPress={() => this.navigateTo('AddProductPage')}/>
                            <Text>Add Products</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="person" onPress={() => this.navigateTo('ProfilePage')}/>
                            <Text>Profile</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
    },
});
