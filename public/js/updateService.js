import "regenerator-runtime/runtime";
import axios from 'axios';
import { showAlert } from './alert';

export const updateServiceFnc =async(updateid,updatename,updatedes)=>{
    try{ 
        const update = await axios({
            method:'PATCH',
            url:`/api/v1/services/update-service/${updateid}`,
            data:{
                serviceName:updatename,
                descriereServiciu:updatedes
            }
        }) 

        if(update.data.status === 'success'){
            showAlert('success','Serviciul a fost actualizat cu susccess!!!');
            // window.setTimeout(()=>{
            //     location.assign('/panou');
            // }, 1500);
        }
    }catch(err){
        console.log(err);
    }
}