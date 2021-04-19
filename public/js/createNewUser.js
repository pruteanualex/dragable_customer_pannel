import "regenerator-runtime/runtime";
import axios from 'axios';
import { showAlert } from './alert';

export const createUser = async(name,email,role,password,confirmPassword)=>{
    try{
        const res = await axios({

            method:'POST',
            url:'/api/v1/users/singup',
            data:{
                role:role,
                name:name,
                email:email,
                password:password,
                passwordConfirm:confirmPassword
            }

        });
        if(res.data.status === 'success'){
            showAlert('success','Utilizator nou creat cu succes!!');
             window.setTimeout(()=>{
                 location.assign('/get-al-users')
             },1500)
        }
    }catch(err){
        showAlert('error',`Utilizatorul nu a putut fi creat=>${err}`);
    }
}

