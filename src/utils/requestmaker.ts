import dotenv from 'dotenv';
import axios, { Method } from 'axios';
import Responses from './responses';

dotenv.config({path: __dirname + '/../../.env'});
const environment = process.env.NODE_ENV;
const services = (require('../../config/url.json')[environment]).services;

type APIs = 
| 'auth' ;

interface Reqmaker{
    service: APIs,
    action: string,
    method: Method,
    data?: any,
    headers?: Object,
}

export default function({service, action, method, data = '', headers = {} }: Reqmaker){
    return new Promise( (resolve, reject) => {
        const url = ((services.find((el) => el.name === service )).url) + '/' + action;
       
        axios({
            url: url,
            method: method,
            headers: headers,
            data: data
        }).then((response) => {
            // console.log(response.status);
            resolve(response.data)
        }).catch((error) => {
            if(error.response){
                console.log(error.response.status);
                reject(error.response.data);
            } else if(error.request){
                console.log('Server conection failed');
                reject(Responses.reponseData('001', 'Could not reach server', []));
            } else {
                console.log('Error', error.message);
                reject(Responses.reponseData('001', 'Unknown request error', []));
            }
            
        });

    });
}
