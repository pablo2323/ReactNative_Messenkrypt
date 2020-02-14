import React from 'react';
import LogIn from "./view/LogIn";
import SignUp from "./view/SignUp";
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {Dashboard} from "./view/Dashboard";
import {ProfilePage} from "./view/dashboard/ProfilePage";
import {AddProductPage} from "./view/AddProductPage";
import {ShowProductPage} from "./view/ShowProductPage";
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';


const MainNavigator = createStackNavigator(
    {
        Login: LogIn,
        SignUp: SignUp,
        Dashboard: Dashboard,
        ProfilePage: ProfilePage,
        AddProductPage: AddProductPage,
        ShowProductPage: ShowProductPage,
    },
    {
        initialRouteName: 'SignUp',
    }
);

const  AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isReady: false,
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
        this.setState({ isReady: true });
    }

    render () {
        if (this.state.loading)
            return (
                <AppLoading />
            );
        return (
            <AppContainer/>
        );
    }
}
