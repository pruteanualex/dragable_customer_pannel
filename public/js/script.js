import { showAlert } from './alert';
import openSocket from 'socket.io-client';
import {createService} from './createService';
import {createClient} from './crerateClient';
import {deleteServiceFnc} from './deleteServices';
import {updateServiceFnc} from './updateService';
import {updateUserFnc} from './updateClient';
import {deleteClientFnc} from './deleteClient';
import {updateServicesClient} from './updateClientServices';
import {loginOlatform , logoutForm} from './login';
import {createUser} from './createNewUser';
import {updateUserData} from './updateUser';
import {updateMyPassword} from './UpdateMyPassword'; 
import {deleteUserFnc} from './deleteUserByAdmin';
import {forgottPasswordFnc} from './forgottPassword';
import {resetPasswordFnc} from './resetPassword';
import {updateMyDataPesonalFnc} from './updateMyData';
import {createProductFnc} from './createProduApi';


function global_resize(){
   //Get Header Footer Height
   const siteBody = document.querySelector('.padd_color');
   if(siteBody){
   const header1 = document.querySelector('.menu_draggable_app_desktop').offsetHeight;
   const footerHeight = document.querySelector('.draggable_pannel_footer').offsetHeight;
    //get window height 
    let global_container = window.innerHeight - header1 - footerHeight;
    let global_container_add_serv = window.innerHeight - header1 - footerHeight - 50 - 92;
    //get elements
    let fullBody = document.querySelector('.panou_special_body');
    let services_area = document.querySelector('.services_areas');
    let draggcontainer = document.querySelector('.height_body_grid');
    

    if(services_area) services_area.style.height = global_container + "px";
    if(fullBody) fullBody.style.height = global_container + "px";
    if(draggcontainer) draggcontainer.style.height = global_container + "px";
    document.querySelectorAll('.client_service_area').forEach((heig)=>{
        heig.style.height = global_container_add_serv + "px";
    });

   //Media querys js
    const tablet = window.matchMedia( "(max-width: 991.98px)" );
    if (tablet.matches) {
        document.querySelectorAll('.client_service_area').forEach((heig)=>{
            heig.style.height = global_container_add_serv - 70 + "px";
        });    

    }
    const mobile = window.matchMedia("(max-width: 575.98px)");
    if(mobile.matches){
        document.querySelectorAll('.client_service_area').forEach((heig)=>{
            heig.style.height = global_container_add_serv - 60 + "px";
        });     
    }
    }else{
        let global_area_post = window.innerHeight  * 100 / 100;
        let login_forgott = document.querySelector('.container_login');
        if(login_forgott) login_forgott.style.height = global_area_post + "px";
    }
 }
 global_resize();
 window.onresize = function(){
     global_resize();
 };


//Menu Script
const openMenu = document.querySelector('.open_menu');
if(openMenu){
    openMenu.addEventListener('click',()=>{
        document.getElementById("mobile_menu").style.right = "0";
    });
}
const colseMenu = document.querySelector('.close--btn');
if(colseMenu){
    colseMenu.addEventListener('click',()=>{
        document.getElementById("mobile_menu").style.right = "-300px";
    });
}

const buttonShowMob_Services = document.getElementById('openservices');
if(buttonShowMob_Services){
    buttonShowMob_Services.addEventListener('click',()=>{
        document.querySelector('.services_areas').style.left = "0";
    });
}
 const buttonCloseMob_Services = document.getElementById('close_services_MOB');
 if(buttonCloseMob_Services){
    buttonCloseMob_Services.addEventListener('click',()=>{
        document.querySelector('.services_areas').style.left = "-100%"; 
    })
 }

//Custom made draggabler carousel
 const slider = document.querySelector('.items_carousel_draggable');
 if(slider){
 let isDown = false;
 let startX;
 let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
   });
  slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
  });
  slider.addEventListener('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const scroll = (x - startX) * 1; 
      slider.scrollLeft = scrollLeft - scroll;
     
  });

 }
//Edn draggable carousel




///
 window.onload = function(){
    var serv = document.querySelectorAll('.add_id_bydeff');
    for (let s=0; s < serv.length; s++) {
        serv[s].setAttribute("id", "remove_service_"+s);
    }
 
    var els = document.querySelectorAll('.client_service_area');
    for (var i=0; i < els.length; i++) {
        els[i].setAttribute("id", "client_"+i);
    }
   //Add Unik id to input 
   let autoincrement = 0; 
   const addInputHiddeId = document.querySelectorAll('.updateCL_cards_info input').forEach(inc =>{
       inc.setAttribute('id','user_add_id--'+autoincrement++);
   });
   let autoincrem = 0; 
   const addInputHidde = document.querySelectorAll('.quicksave input').forEach(inc =>{
       inc.setAttribute('id','user_add_ids--'+autoincrem++);
   });
   //Add unik class to form
   let autoincrement1 = 0; 
   const addInputHiddeClass = document.querySelectorAll('.updateCL_cards_info').forEach(inc =>{
       inc.setAttribute('class','updateCL_cards_info user_add_form--'+autoincrement1++);
   }); 

   let autoincrement2 = 0; 
   const addInputHiddeClass1 = document.querySelectorAll('.clientservice__box').forEach(inc =>{
       inc.setAttribute('class','clientservice__box  user_existing_id_form--'+autoincrement2++);
   }); 
   
   let autoincrement3 = 0; 
   const addInputHiddeClass2 = document.querySelectorAll('.clientservice__box .addRemoveFunction').forEach(inc =>{
       inc.setAttribute('id','admin_remove_service--'+autoincrement3++);
   }); 

   let autoincrement4 = 0; 
   const addInputHiddeClass3 = document.querySelectorAll('.deleteForm_client-existingService').forEach(inc =>{
       inc.setAttribute('id','deleteForm_client-existingService--'+autoincrement4++);
   }); 

   
   let autoincrement5 = 0; 
   const addInputHiddeClass4 = document.querySelectorAll('.quicksave').forEach(inc =>{
       inc.setAttribute('id','quicksave--'+autoincrement5++);
   });
   

   var els = document.querySelectorAll('.client_service_area');
    for (var i=0; i < els.length; i++) {
        els[i].setAttribute("id", "client_"+i);
    }

    var ddServices = document.querySelectorAll('.add_service-admin')
    for (var q=0; q < ddServices.length; q++) {
        ddServices[q].setAttribute("id", "addd_draggable_event__"+q);
    }

    const individualdragEvent =  document.querySelectorAll(".client_service_area");
        for (let n=0; n< individualdragEvent.length; n++) {
            document.getElementById(`addd_draggable_event__${n}`).addEventListener('click',()=>{
                document.getElementById(`client_${n}`).classList.add('dragg_container_active')



                'use strict';
                const dragulla =document.getElementById('services_socialmedia');
                if(dragulla){
                    var elss = document.querySelectorAll('.client_service_area');
                        dragula(
                            [
                                document.getElementById('services_socialmedia') , document.querySelector('.dragg_container_active')
                            ],{copy:true});
                  
                        }
            })
        }
  
 
    const getAll_clickform =  document.querySelectorAll(".updateCL_cards_info");
        for (let z=0; z< getAll_clickform.length; z++) {
            document.querySelector(`.user_add_form--${z}`).addEventListener('submit',(stopPrev)=>{
                stopPrev.preventDefault();
                //Get Client ID
                let valueId = document.getElementById(`user_add_id--${z}`).value;
                //Get Client Added New Services

                const push_client_serviuces = [];
                document.querySelectorAll(`#client_${z} .card form .add_id_bydeff`).forEach(valueByUser =>{
                     push_client_serviuces.push(valueByUser.value);  
                });
                //Get Client Existing Services
                document.querySelectorAll(`.user_existing_id_form--${z} .card .card_header form .form-group input`).forEach(existingVal=>{
                    push_client_serviuces.push(existingVal.value); 
                });


                updateServicesClient(valueId,push_client_serviuces);
            })
  
        };



        const getAll_ExistingServices =  document.querySelectorAll(".quicksave");
        for (let s=0; s< getAll_ExistingServices.length; s++) {
            document.getElementById(`quicksave--${s}`).addEventListener('submit',(stopPrevs)=>{
                stopPrevs.preventDefault();
                //Get Client ID
                let valueIds = document.getElementById(`user_add_ids--${s}`).value;
                //Get Client Existing Services
                const push_client_existing_serv = [];
                document.querySelectorAll(`.user_existing_id_form--${s} .card .card_header form .form-group input`).forEach(existingVals=>{
                    push_client_existing_serv.push(existingVals.value); 
                });
                
                updateServicesClient(valueIds,push_client_existing_serv);
            })
  
        };



    
    const deletePress_ServiceById = document.querySelectorAll('.clientservice__box .card');
    for (let y=0; y< deletePress_ServiceById.length; y++) {
        document.getElementById(`deleteForm_client-existingService--${y}`).addEventListener('click',()=>{
            document.getElementById(`admin_remove_service--${y}`).remove()
        });
    }

 }

  


//Get Value to create a new service card
const createServices = document.querySelector('.createServiceForm');
if(createServices){
    createServices.addEventListener('submit',(el)=>{
          el.preventDefault();
          const serviceName = document.getElementById('servicename_create').value;
          const serviceDescription = document.getElementById('serviceDescription').value;
        
          createService(serviceName,serviceDescription);
    })
}


//Get value to create a new clien card
const createClients = document.querySelector('.createClientForm');
if(createClients){
    createClients.addEventListener('submit',(xl)=>{
        xl.preventDefault();

        const getCleintName = document.getElementById("clientname_create").value;
        const getFbPage = document.getElementById("facebookpage_create").value;
        const getFbPageLink = document.getElementById("facebookpagelink_create").value;
        const getWebsiteName = document.getElementById("websitename").value;
        const getWebsiteNameLink = document.getElementById("websitelink_create").value;

        createClient(getCleintName,getFbPage,getFbPageLink,getWebsiteName,getWebsiteNameLink)
    })
}

//Update Services
const updateServices = document.querySelector('.editServiceForm');
if(updateServices){
    updateServices.addEventListener('submit',(ed)=>{
        ed.preventDefault();

        const updateId = document.getElementById('editServid').value;
        const updateName = document.getElementById('servicename_edit').value;
        const updateDes = document.getElementById('serviceDescription_edit').value;

        updateServiceFnc(updateId,updateName,updateDes);

    })
}


//Delete Service
const deleteService = document.querySelector('.deleteService');
if(deleteService){
    deleteService.addEventListener('submit',(del)=>{
        del.preventDefault();

        const getdeleteid = document.getElementById('deleteServiceHidde').value;
        deleteServiceFnc(getdeleteid);
    })
}

//Update Client
const updateClient = document.querySelector('.editClientForm');
if(updateClient){
    updateClient.addEventListener('submit',(clien)=>{
        clien.preventDefault();
        
            const name = document.getElementById('clientname_edit').value;
            const fbPageName = document.getElementById('facebookpage_edit').value;
            const fbPageLink = document.getElementById('facebookpagelink_edit').value;
            const clientWebsiteName = document.getElementById('websitename_edit').value;
            const clientWebsiteeLink = document.getElementById('websitelink_edit').value;

        const getIDuPclient = document.getElementById('updateClientids').value;
        updateUserFnc(getIDuPclient,name,fbPageName,fbPageLink,clientWebsiteName,clientWebsiteeLink);
    })
}

//Delete Client
const deleteClient = document.querySelector('.deleteClientForm');
if(deleteClient){
    deleteClient.addEventListener('submit',(delCL)=>{
        delCL.preventDefault();
        
        const deleteClient_Id = document.getElementById('deleteServiceHidde').value;
        deleteClientFnc(deleteClient_Id);
    })
}

///Login 
const loginPlatform = document.querySelector('.login_platform_form');
if(loginPlatform){
    loginPlatform.addEventListener('submit',(el)=>{
        el.preventDefault();

        const email = document.getElementById('login_email_adress').value;
        const password = document.getElementById('login_user_password').value;

        loginOlatform(email,password);
    })
}

const logoutButton = document.querySelector('.logoutvalue_platform');
if(logoutButton){
    logoutButton.addEventListener('click',logoutForm);   
}

const logoutButtonMobile = document.querySelector('.logoutvalue_platform_mobile');
if(logoutButtonMobile){
    logoutButtonMobile.addEventListener('click',logoutForm);   
}


///////Search Bar Code
const searchPlatformInside = document.getElementById('pannel_input_search');
if(searchPlatformInside){
document.getElementById('pannel_input_search').addEventListener('keyup',()=>{
    var input, filter, container_platform, container_platform_list, name_indentifier, i, txtValue;
    input = document.getElementById("pannel_input_search");
    filter = input.value.toUpperCase();
    container_platform = document.querySelector(".items_carousel_draggable");
    container_platform_list = container_platform.querySelectorAll(".dropped");
    for (i = 0; i < container_platform_list.length; i++) {
        name_indentifier = container_platform_list[i].querySelector(".user_ui_id .row .searchname .name");
        txtValue = name_indentifier.textContent || name_indentifier.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            container_platform_list[i].style.display = "";
        } else {
            container_platform_list[i].style.display = "none";
        }
    }
});

}

//Users JS
const createuser = document.querySelector('.addUserTo');
if(createuser){
    createuser.addEventListener('submit',(us)=>{
        us.preventDefault();

        const username = document.getElementById("create_USER--nane").value;
        const useremail = document.getElementById("create_USER--email").value;
        const userpassword = document.getElementById("create_USER--password").value;
        const userconfirmpassword = document.getElementById("create_USER--confirmPassword").value;
        const userrole = document.getElementById('create_USER--role').value;
        
        createUser(username,useremail,userrole,userpassword,userconfirmpassword);
    })
}

//Update User Data By Admin
const updateUserForm = document.querySelector('.updateUserData');
if(updateUserForm){
    updateUserForm.addEventListener('submit',(upd)=>{
        upd.preventDefault();
        const userId  = document.getElementById('userEditId').value;
        const userRole = document.getElementById('userEditRole').value;

        updateUserData(userId,userRole);
    })
}

//Update Password User By Admin
const updateByAdmin = document.querySelector('.updateUserPassword_byMe');
if(updateByAdmin){
    updateByAdmin.addEventListener('submit',(addUp)=>{
        addUp.preventDefault();
        const currentPassId = document.getElementById('password--update_my_id').value;
        const currentPass = document.getElementById('update_current--password').value;
        const newPass = document.getElementById('update_current--newpassword').value;
        const confirmPass = document.getElementById('update_current--confirmnewpassword').value;
        if(newPass === confirmPass && newPass !== "" && confirmPass !== ""){
            updateMyPassword(currentPassId,currentPass,newPass,confirmPass)
        }else{
            showAlert('error','Password not match or a field or more is empty!!!');  
        }
    })
}

const deleteUserByAdmin = document.querySelector('.deleteUserByAdmin');
if(deleteUserByAdmin){
    deleteUserByAdmin.addEventListener('submit',(deleteUp)=>{
        deleteUp.preventDefault();
        const delUserId = document.getElementById('deleteUserById').value;
        deleteUserFnc(delUserId);
    })
}

// Forgott Password Script
const forgottPassword = document.querySelector('.forgott_password_platform_form');
if(forgottPassword){
    forgottPassword.addEventListener('submit',(fog)=>{
        fog.preventDefault();
        const forgottEmail = document.getElementById('forgottPassword_email_adress').value;
        if(forgottEmail === ""){
            showAlert('error','Email adress is required!!!');
        }else{
            forgottPasswordFnc(forgottEmail);
            console.log(forgottEmail.length);
        }
    })
}

const resetPassword = document.querySelector('.reset_password_platform_form');
if(resetPassword){
    resetPassword.addEventListener('submit',(reset)=>{
       reset.preventDefault();
        //get website pathname
        const getPageUrlPath = window.location.pathname;
        //get website reset token
        const getPageUrl = getPageUrlPath.split('/')[2];
        //get new password and confirm password fields value
        const pass_new = document.getElementById('resetPassword_email_adress').value;
        const conf_pass_new = document.getElementById('confirm_resetPassword_email_adress').value;
        
        if(pass_new === conf_pass_new && pass_new !== "" && conf_pass_new !== ""){
            console.log(getPageUrl,pass_new,conf_pass_new);
            resetPasswordFnc(getPageUrl,pass_new,conf_pass_new);
        }else{
            showAlert('error','Password not match or a field or more is empty!!!');
        }
       
    });
}

// Update My Data
const personalUpdate = document.querySelector('.updateUserAccount_byMe');
if(personalUpdate){
    personalUpdate.addEventListener('submit',(pesonal)=>{
        pesonal.preventDefault();

        const personalId = document.getElementById('account--update_my_id').value;
        const personalName = document.getElementById('account--update_my_username').value;
        const personalEmail = document.getElementById('account--update_my_email').value;

        updateMyDataPesonalFnc(personalId,personalName,personalEmail);

    });
}







// Update My Data
const createProduct = document.querySelector('.createProductsApi');
if(createProduct){
    createProduct.addEventListener('submit',(product)=>{
        product.preventDefault();

        const prodName = document.getElementById('create_product_name').value;
        const prodCat = document.getElementById('create_product_category').value;
        const prodPrice = document.getElementById('create_product_price').value;
        const prodImg = document.getElementById('create_product_image').value;
        const prodDes = document.getElementById('create_product_description').value;
       

        createProductFnc(prodName,prodCat,prodPrice,prodImg,prodDes);

    });
}












//SocketIo Front End
const socket = io();
// socket.on('newposts',data =>{
//     if(data.action === 'create')
// })
socket.on('connect',() =>{
    console.log('Connected to server');
})

socket.on('disconnect',() =>{
    console.log('Disonnected to server');
})