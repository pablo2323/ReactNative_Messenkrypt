import React, { Component } from 'react';
import {Container} from "native-base";
import {tokenService} from "../services/User";
import {FooterTabs} from "./Footer";
import {ContentView} from "./ContentView";


export class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.token = tokenService.CheckToken;
        this.state = {
            socket: this.props.navigation.getParam('socket'),
        }
    }

    async componentDidMount(){
        this.socket = this.props.navigation.getParam('socket');
    }

    async getAnswer() {
        await this.socket.getAllItem();
        return await this.socket.getServerAnswer("product:list");
    }

    render() {
        return (
            <Container>
                <ContentView socket={this.state.socket}/>
                <FooterTabs navigation={this.props.navigation}/>
            </Container>
        );
    }
}
