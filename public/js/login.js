import "regenerator-runtime/runtime";
import axios from 'axios';
import { showAlert } from './alert';

//Login Function
export const loginOlatform = async(email,password)=>{
    try{
       const login = await axios({
           method:'POST',
           url:'/api/v1/users/login',
           data:{
            email:email,
            password:password
           }
       });
       if(login.data.status === 'success'){
          showAlert('success','Va-ti logat cu success!!!');
           window.setTimeout(()=>{
               location.assign('/panou')
           },1500)
       }
       console.log(login);
    }catch(err){
        showAlert('error','A aparut o problema la logare!!!');
    }
}

//Log Out Function

export const logoutForm = async()=>{
    try{
        const logout = await axios({
            method:'GET',
            url:'/api/v1/users/logout'
        })
        if(logout.data.status === 'success') location.assign('/');

    }catch(err){
        showAlert('error','Error loggin out! Try again')
    }
}