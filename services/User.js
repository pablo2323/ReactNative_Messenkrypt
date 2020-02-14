import {AsyncStorage} from 'react-native';

export class tokenService {

    static accessToken = "access_token";
    static async SaveToken(token, username) {
        try {
            const jData = {
                token: token,
                username: username
            };
            return await AsyncStorage.setItem(this.accessToken, JSON.stringify(jData));
        } catch (e) {
            return null;
        }
    }

    static async CheckToken() {
        try {
            const savedData = await AsyncStorage.getItem(this.accessToken);
            return JSON.parse(savedData);
        } catch (e) {
            return null;
        }
    }
}
