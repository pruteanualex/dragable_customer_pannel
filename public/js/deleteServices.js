import "regenerator-runtime/runtime";
import axios from 'axios';


export const deleteServiceFnc = async(id_service)=>{
    try{

     const deleteSer = await axios({
         method:"DELETE",
         url:`/api/v1/services//delete-service/${id_service}`
     })
     window.setTimeout(()=>{
        location.assign('/panou');
    }, 100);

    }catch(err){
        console.log('Error:',err);
    }
}

