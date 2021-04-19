import "regenerator-runtime/runtime";
import axios from 'axios';
import { showAlert } from './alert';

export const forgottPasswordFnc = async (email) =>{
    try{
        const forgott = await axios({
            method:'POST',
            url:'/api/v1/users/forgot-password',
            data:{
                email:email
            }
        });
        if(forgott.data.status === 'success'){
            document.querySelector('.forgott_password_platform_form ').style.display = "none";
            document.querySelector('.display_non_success').style.display = "none";
            document.querySelector('.message_infomativ_forgot').style.display = "block";
        }
    }catch(err){
        showAlert('error','A aparut o problema la logare!!!');
    }
}