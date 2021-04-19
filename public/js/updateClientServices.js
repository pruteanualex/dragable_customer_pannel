import "regenerator-runtime/runtime";
import axios from 'axios';
import { showAlert } from './alert';

export const updateServicesClient = async(id_user,user_services)=>{
    try{
        const servUpdate = await axios({
            method:"PATCH",
            url:`/api/v1/services/update-client/${id_user}`,
            data:{
                services:[...user_services]
            }
        });

        if(servUpdate.data.status === 'success'){
            showAlert('success','Serviciile clientului a fost actualizat cu success!!!');
            window.setTimeout(()=>{
                location.assign('/panou');
            }, 1500);
        }
    }catch(err){
        console.log(`Error:${err}`);
    }
 

}