import React, { Component }  from 'react'
import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import Socket from "../services/Socket";

import OpenPGP from "react-native-fast-openpgp";
 
interface KeyOptions {
  cipher?: "aes128" | "aes192" | "aes256";
  compression?: "none" | "zlib" | "zip";
  hash?: "sha256" | "sha224" | "sha384" | "sha512";
  RSABits?: 2048 | 4096 | 1024;
  compressionLevel?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}
interface Options {
  comment?: string;
  email?: string;
  name?: string;
  passphrase?: string;
  keyOptions?: KeyOptions;
}
interface KeyPair {
  publicKey: string;
  privateKey: string;
}

//const [keyPair, setKeyPair] = useState({ publicKey: '', privateKey: '' });

export default class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:  '',
	    publicKey: null,
	    titleText: "Register",
	    bodyText: 'Please enter username for your account'
        }
    }

    componentDidMount() {
        this.socket = new Socket("https://api.dev.socket.messenkrypt.xyz");
    }

    async checkValidForm() {
        if (!this.state.username) {
            Alert.alert("Invalid Form", "Username is empty");
        }
        else {

	    OpenPGP.generate({
                    name: 'test',
                    email: 'test@test.com',
                    passphrase: 'test',
                    keyOptions: {
                      RSABits: 1024,
                    },
            }).then(async(keys) => {
	     await this.socket.register(this.state.username, this.state.publicKey);
             let data = await this.socket.getServerAnswer("user:register");
	    });
	    
	    
            //console.log("DATA : [ " + data["message"] + " ] || [ " + data + " ] ");
            //if (data && data === "USER_FOUND") {
            //    Alert.alert("Username already taken", "Please choose another username");
            //}
            //else if (data && data["message"] === "USER_CREATED") {
            //    Alert.alert("User created", "You are going to be redirected to the login page");
            //    this.props.navigation.navigate('Login');
            //}
	    //else{
		//console.log(data);
	    //}
        }
    }

    render() {
        return (
	      <View style={style.container}>
	      <Text style={style.baseText}>
		<Text style={style.titleText} onPress={this.onPressTitle}>
		{this.state.titleText}{'\n'}{'\n'}
                </Text>
		<Text numberOfLines={5}>
		{this.state.bodyText}{'\n'}
                </Text>
              </Text>
                <View style={style.inputContainer}>
                    <TextInput style={style.inputs}
                        placeholder="Username"
                               git remote show origin
                               keyboardType="email-address"
                            onChangeText={(username) => this.setState({username})}/>
                    </View>
                    <View>
                        <Button onPress={() => this.checkValidForm()} title={"Register"} />
                    </View>
                </View>
            );
        }
}

const style =  StyleSheet.create({
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
    inputs: {
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    baseText: {
      //fontFamily: 'Cochin',
    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
});
