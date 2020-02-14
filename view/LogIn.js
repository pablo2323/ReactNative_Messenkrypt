import React, { Component } from 'react';
import { View, Image, TextInput, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import Socket from "../services/Socket";
import {tokenService} from "../services/User";
import { Text } from 'native-base';

export default class LogIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    componentDidMount(): void {
        this.socket = new Socket("http://192.168.0.13:1337");
    }

    async checkValidForm() {
        if (!this.state.username || !this.state.password) {
            Alert.alert("Invalid Form", "Username or Password is empty");
        } else {
            await this.socket.login(this.state.username, this.state.password);
            let data = await this.socket.getServerAnswer("user:login");
            //console.log(data["token"]);
            switch (data) {
                case "WRONG_PASSWORD":
                    Alert.alert("Invalid information", "Invalid password or username");
                    break;
                case "USER_NOT_FOUND":
                    Alert.alert("User not found", "You need to register first");
                    break;
                default:
                    await this.socket.auth(data["token"]);
                    let ret = await this.socket.getServerAnswer("user:auth");
                    if (ret === "CONNECTED") {
                        await tokenService.SaveToken(data["token"], data["username"]);
                        this.props.navigation.navigate('Dashboard', {socket: this.socket});
                    }
            }
        }
    }

    render() {
        return (
            <View>

                <Image style={{width: 400, height: 400, marginLeft: 10}}
                       source={require('../assets/ic_launcher_beta_round.png')} />
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ultraviolet/40/000000/name.png'}}/>
                        <TextInput style={styles.inputs}
                                   placeholder="Username"
                                   keyboardType="email-address"
                                   autoCorrect={false}
                                   value={this.state.username}
                                   onChangeText={(text) => this.setState({username: text})}/>
                    </View>

                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
                        <TextInput style={styles.inputs}
                                   placeholder="Password"
                                   secureTextEntry={true}
                                   value={this.state.password}
                                   onChangeText={(password) => this.setState({password})}/>
                    </View>

                    <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.checkValidForm()}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableHighlight>


                    <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('SignUp')}>
                        <Text>Register</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
    }
});
