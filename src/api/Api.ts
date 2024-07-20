import axios from "axios";
import moment from "moment/moment";
import {Issue} from "../types.ts";

class Api{

    async getComments(){
        const response = await axios.get('https://sandbox.creos.me/api/v1/comment/?format=json&ordering=-date_created');

        if(Array.isArray(response.data)){
            return response.data.slice(0,10);
        }
        return response.data;

    }
    async getTopDesigners(page: number){
        const response = await axios.get(`https://sandbox.creos.me/api/v1/designer/?format=json&page=${page}`);
        return response.data;
    }

    async getMedianByName(name: string){
        const response = await axios.get(`https://sandbox.creos.me/api/v1/issue/?format=json`);
        if(Array.isArray(response.data)){
            return response.data.filter(item => item.designer === name && item.status === 'Done');
        }
        return response.data;
    }

    async getIssuesFromMonth(){
        const response = await axios.get(`https://sandbox.creos.me/api/v1/issue/?format=json`);
        return response.data.filter((issue: Issue)  => moment(issue.date_finished).week() > moment().week() - 9)
    }

    async getStatisticStatusFromIssues(){
        const response = await axios.get(`https://sandbox.creos.me/api/v1/issue/?format=json`);

        return response.data.map((item : Issue) => item.status);
    }

    

}

export default new Api();