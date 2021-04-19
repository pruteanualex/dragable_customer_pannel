import axios from 'axios';

export const deleteUserFnc = async(id)=>{
    try{
     const deleteUser = await axios({
         method:"DELETE",
         url:`/api/v1/users/get-user/${id}`
     })
     window.setTimeout(()=>{
        location.assign('/get-al-users');
    }, 100);

    }catch(err){
        console.log('Error:',err);
    }
}