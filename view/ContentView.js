import React, { Component } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { Card, CardItem} from "native-base";

export class ContentView extends Component {
    constructor(props){
        super(props);
        this.socket = this.props.socket;
        this.state = {
            list: null,
            title: null,
            content: null
        };
    }

    async componentDidMount() {
        await this.socket.getAllItem();
        this.list = await this.socket.getServerAnswer("product:list");
        const str = JSON.stringify(this.list);
        this.title = str.substring(str.indexOf('"title":') + 9, str.lastIndexOf('"content"') - 2);
        this.content = str.substring(str.indexOf('"content":') + 11, str.lastIndexOf('"createdBy"') - 2);
        this.setState({
            list: this.list,
            title: this.title,
            content: this.content
        });
        console.log(`TITRE : ${this.title} || CONTENU : ${this.content}`);
    }

    render() {
        return (
            <ScrollView>
                <Card>
                    <CardItem>
                        <Text>{this.state.title}</Text>
                    </CardItem>
                    <CardItem>
                        <Image source={{uri: 'https://cloudflare-ipfs.com/ipfs/QmRYDzEq3DWh3K8K8dCsYns1aimPmymLLtbMHa1mFJU6uL'}}/>
                    </CardItem>
                    <CardItem>
                        <Text>{this.state.content}</Text>
                    </CardItem>
                </Card>
            </ScrollView>
        );
    }
}
