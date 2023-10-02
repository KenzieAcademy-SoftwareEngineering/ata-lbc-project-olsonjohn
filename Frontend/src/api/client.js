import axios from 'axios';
import BaseClass from "../util/baseClass";

class Client extends BaseClass {

    constructor(props = {}){
        super();
        const methodsToBind = ['clientLoaded', 'getUsers', 'handleError'];
        this.bindClassMethods(methodsToBind, this);
        this.props = props;
        this.clientLoaded(axios);
    }

    clientLoaded(client) {
    this.client = axios.create({
        baseURL: 'http://localhost:3000/api',
        timeout: 1000,
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
    });


    this.getUsers = async () => {
        try {
            const response = await this.client.get(`/users`);
            return response.data;
        } catch (error) {
            this.handleError("getExample", error);
        }
    };

    this.handleError = (method, error ) => {
        console.error(`Error in ${method}: ${error}`);
        }
    };
};


export default Client;


