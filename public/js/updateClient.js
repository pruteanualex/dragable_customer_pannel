import "regenerator-runtime/runtime";
import axios from 'axios';
import { showAlert } from './alert';

export const updateUserFnc =async(clientid,nume,fbPageName,fbPageLink,clientWebsiteName,clientWebsiteeLink)=>{
    try{
        const update = await axios({
           method:'PATCH',
           url:`/api/v1/services/update-client/${clientid}`,
           data:{
            name:nume,
            fbPageName:fbPageName,
            fbPageLink:fbPageLink,
            clientWebsiteName:clientWebsiteName,
            clientWebsiteeLink:clientWebsiteeLink
           }
        });

        if(update.data.status === 'success'){
            showAlert('success','Datele Clientului au fost  actualizate cu success!!!');
            // window.setTimeout(()=>{
            //     location.assign('/panou');
            // }, 1500);
        }
    }catch(err){
        console.log(err);
    }
}