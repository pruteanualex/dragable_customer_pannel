import "regenerator-runtime/runtime";
import axios from 'axios';
import { showAlert } from './alert';

export const createProductFnc = async(prodName,prodCat,prodPrice,prodImg,prodDes)=>{
    try{
        const res = await axios({

            method:'POST',
            url:'api/v2/products/create-product',
            data:{
                productName:prodName,
                productCategory:prodCat,
                productPrice:prodPrice,
                productImage:prodImg,
                productDescription:prodDes
            }

        });
        if(res.data.status === 'success'){
            showAlert('success','Produs nou creat cu succes!!');
            document.getElementById('create_product_name').value="";
            document.getElementById('create_product_category').value="";
            document.getElementById('create_product_price').value="";
            document.getElementById('create_product_image').value="";
            document.getElementById('create_product_description').value="";
        }
    }catch(err){
        showAlert('error',`Produsul nu a putut fi creat=>${err}`);
    }
}

