import "regenerator-runtime/runtime";
import axios from 'axios';
import { showAlert } from './alert';

export const updateUserData = async(id,role)=>{
    try{
   
     const update = await axios({
        method:'PATCH', 
        url:`/api/v1/users/get-user/${id}`,
        data:{
            role:role
        }
     })
     if(update.data.status === 'success'){
        showAlert('success','User data updated successfully');
        window.setTimeout(()=>{
            location.assign('/get-al-users');
        }, 1500);
    }    
        
    }catch(err){
        showAlert('error','A aparut o problema!!!');
        console.log(error);
    }
}