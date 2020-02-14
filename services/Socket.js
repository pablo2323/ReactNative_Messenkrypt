import socketIO from "socket.io-client";
import {Alert} from "react-native";

export default class Socket {
    constructor(url: string){
        this.data = null;
        this.socket = socketIO(url, {
            transports: ['websocket'],
            jsonp: false
        });
        this.socket.connect();
        this.socket.on('connect', () => {
            console.log('connected to socket server');
        });
    }

    register(username: string, publicKey: string) {
        this.socket.emit("user:register", username, publicKey);
    }

     async login(username: string, password: string) {
         await this.socket.emit("user:login", username, password);
    }

    async auth(token: string) {
        await this.socket.emit("user:auth", token);
    }

    async getAllItem() {
        await this.socket.emit("product:list", "");
    }

     async getServerAnswer(url: string) {
         let socket = this.socket;
         return new Promise(function (resolve, reject) {
             socket.on(url + ":success", function(data){
                 console.log(url + " :success : " + JSON.stringify(data));
                 resolve(data);
             });
             socket.on(url + ":err", function(err){
                 console.log(url + " err: " + err);
                 resolve(err);
             });
         })
    }
}
