import "regenerator-runtime/runtime";
import axios from 'axios';
import { showAlert } from './alert';

export const createService = async(title,date)=>{
    try{
        const create = await axios({
            method:'POST',
            url:'/api/v1/services/create-services',
            data:{
                serviceName:title,
                descriereServiciu:date
            }
        });
        if(create.data.status === 'success'){
             showAlert('success','Serviciul a fost creat !!!');
             window.setTimeout(()=>{
                 location.assign('/panou');
             }, 1500);
         }
       
    }catch(err){
        console.log(err);
    }
    
}




