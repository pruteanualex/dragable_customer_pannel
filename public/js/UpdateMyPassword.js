import "regenerator-runtime/runtime";
import axios from 'axios';
import { showAlert } from './alert';

export const updateMyPassword = async(id,currentp,newp,confirmp) =>{
    try{
        const result = await axios({
            method:'PATCH',
            url:`/api/v1/users/updateMyPassword/${id}`,
            data:{
                passwordCurrent:currentp,
                password:newp,
                passwordConfirm:confirmp
            }
        });
        if(result.data.status === 'success'){
            showAlert('success','User data updated successfully');
            window.setTimeout(()=>{
                location.assign('/account-settings');
            }, 1500);
        }
    }catch(err){
        showAlert('error','A aparut o problema!!!');
        console.log(err);
    } 
}