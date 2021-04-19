import "regenerator-runtime/runtime";
import axios from 'axios';
import { showAlert } from './alert';


export const createClient = async(getCleintName,getFbPage,getFbPageLink,getWebsiteName,getWebsiteNameLink)=>{
    try{
        const create = await axios({
            method:"POST",
            url:'/api/v1/services/create-client',
            data:{
                name:getCleintName,
                fbPageName:getFbPage,
                fbPageLink:getFbPageLink,
                clientWebsiteName:getWebsiteName,
                clientWebsiteeLink:getWebsiteNameLink
            }
        });

        if(create.data.status === 'success'){
            showAlert('success','Cardul Clientului a fost creat!!!');
            window.setTimeout(()=>{
                location.assign('/panou');
            }, 1500);
        }

    }catch(err){
        console.log(err);
    }
}