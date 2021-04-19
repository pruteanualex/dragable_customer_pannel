import "regenerator-runtime/runtime";
import axios from 'axios';
import { showAlert } from './alert';

export default class GetServicesSelect{

    constructor(idService){
        this.idService = idService
    }
    async getAllServices(){
        try{
            const getServ = await axios(`api/v1/services/get-service/${this.idService}`);
            return this.get_Serv =  getServ.data;
           
        }catch(err){
            console.log(err)
            showAlert('error','There any problems to find that service!!!');
        }
    } 

}

