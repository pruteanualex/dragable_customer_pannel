import "regenerator-runtime/runtime";
import axios from 'axios';
import { showAlert } from './alert';

export const updateMyDataPesonalFnc = async(id,name,email) =>{
    try{
        const update = await axios({
            method:'PATCH',
            url:`/api/v1/users/updateMy/${id}`,
            data:{
                name:name,
                email:email
            }
        });
    if(update.data.status === 'success'){
        showAlert('success','User data updated successfully');
        // window.setTimeout(()=>{
        //    // location.assign('/account-settings');
        // }, 1500);
    }
    }catch(err){
        showAlert('error','A aparut o problema!!!');
         console.log(error);
    }
    console.log(id,name,email)
}