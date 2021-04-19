import "regenerator-runtime/runtime";
import axios from 'axios';
import { showAlert } from './alert';

export const resetPasswordFnc = async (token,newPass,ConfNewPass)=>{
    try{
        const reset = await axios({
            method:"PATCH",
            url:`/api/v1/users/reset-password/${token}`,
            data:{
                password:newPass,
                passwordConfirm:ConfNewPass
            }
        });
        if(reset.data.status === 'success'){
            showAlert('success','Your password has been changed successfully!!!');
            window.setTimeout(()=>{
                location.assign('/panou');
            }, 1500);
        }
    }catch(err){
        showAlert('error','There was a problem resetting the password!!!');
    }
 
}