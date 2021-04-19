import axios from 'axios';

export const deleteClientFnc = async(id_client)=>{
    try{

     const deleteClt = await axios({
         method:"DELETE",
         url:`/api/v1/services/delete-client/${id_client}`
     })
     window.setTimeout(()=>{
        location.assign('/panou');
    }, 100);

    }catch(err){
        console.log('Error:',err);
    }
}