import React, { Component } from 'react';
import {View, TouchableOpacity} from 'react-native';
import { Container, Text} from "native-base";
import {FooterTabs} from "./Footer";
import t from 'tcomb-form-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

const Product = t.struct({
    name: t.String,
    description: t.String,
});

const Form = t.form.Form;

const options = {
    comment: {
        multiline: true,
        stylesheet: {
            ...Form.stylesheet,
            textbox: {
                ...Form.stylesheet.textbox,
                normal: {
                    ...Form.stylesheet.textbox.normal,
                    height: 200,
                    textAlignVertical: 'top',
                },
                error: {
                    ...Form.stylesheet.textbox.error,
                    height: 200,
                },
            },
        },
    },
}

export class AddProductPage extends Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    };

    constructor(props){
        super(props);
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Form type={Product} />
                    <Camera style={{ flex: 1 }} type={this.state.type}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                                style={{
                                    flex: 0.1,
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    this.setState({
                                        type:
                                            this.state.type === Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back,
                                    });
                                }}>
                                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}
