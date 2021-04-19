const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
   productName:{
       type:String
   },
   productCategory:{
       type:String
   },
   productPrice:{
       type:String
   },
   productImage:{
    type:String
   },
   productDescription:{
    type:String
   }
})



const Product = mongoose.model('Product',productSchema);

module.exports = Product;