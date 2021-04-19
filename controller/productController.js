const Product = require('../modules/productsModule');

//Create Nwe Products
exports.createNewProduct = async (req,res)=>{
    try{

        const createNewProdduct = await Product.create(req.body);

        res.status(201).json({
            status:"success",
            data:createNewProdduct
        })

    }catch(err){
       res.status(403).json({
           status:"Error",
           message:`Error => ${err}`
       })
    }
}

//Get All Products
exports.getAllProducts = async (req,res)=>{
    try{

        const getAllProducts = await Product.find();

        res.status(201).json({
            status:"success",
            numProduct:getAllProducts.length,
            data:getAllProducts
        })

    }catch(err){
       res.status(403).json({
           status:"Error",
           message:`Error => ${err}`
       })
    }
}
//Get Single Product
exports.getSingleProductBaseOnId = async (req,res)=>{
    try{

        const getSingleProduct = await Product.findById(req.params.productID);

        res.status(201).json({
            status:"success",
            product:getSingleProduct
        })

    }catch(err){
       res.status(403).json({
           status:"Error",
           message:`Error => ${err}`
       })
    }
}

//Get All Category
exports.getAllCategory = async (req,res)=>{
    try{

        const categoryAvailable = await Product.find().select('productCategory');

        res.status(201).json({
            status:"success",
            category:categoryAvailable
        })

    }catch(err){
       res.status(403).json({
           status:"Error",
           message:`Error => ${err}`
       })
    }
}

//Get All Product Base on Category

exports.getAllProductCategory = async (req,res)=>{
    try{

        const allProductCategory = await Product.find({productCategory:req.params.categoryName});

        res.status(201).json({
            status:"success",
            catAmount:allProductCategory.length,
            category_product:allProductCategory
        })

    }catch(err){
       res.status(403).json({
           status:"Error",
           message:`Error => ${err}`
       })
    }
}

//Filter Product Base On Price
exports.getProductPrice  = async (req,res)=>{
    try{
        const getAllPrice = await Product.find().select('productPrice')

        res.status(200).json({
            status:'success',
            prices:getAllPrice
        })
    }catch(err){
        res.status(403).json({
            status:"Error",
            message:`Error => ${err}`
        })
     }
}

//Get Procut Base On Price
exports.getAllProductPrice = async (req,res)=>{
    try{

        const allProductPrice = await Product.find({productPrice:req.params.priceSelected});

        res.status(201).json({
            status:"success",
            PriceAmount:allProductPrice.length,
            price_product:allProductPrice
        })

    }catch(err){
       res.status(403).json({
           status:"Error",
           message:`Error => ${err}`
       })
    }
}

//Delete Products 
exports.deleteProduct = async (req,res)=>{
    try{

        const deleteProduct = await Product.findByIdAndDelete(req.params.deletedProdId);

        res.status(500).json({
            status:"success",
            data:deleteProduct,
        })

    }catch(err){
       res.status(403).json({
           status:"Error",
           message:`Error => ${err}`
       })
    }
}

//Update Product Data
exports.updateProductFnc = async(req,res)=>{
    try{

        const updateProduct = await Product.findByIdAndUpdate(req.params.productID,req.body,{new:true});
        console.log(req.params.productID)

        res.status(500).json({
            status:"success",
            data:updateProduct,
        })


    
           



    }catch(err){
       res.status(403).json({
           status:"Error",
           message:`Error => ${err}`
       })
    }
}