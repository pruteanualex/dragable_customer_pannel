const path  = require('path');

module.exports = {
    entry:{
        bundle:['./public/js/script.js'],
        bundle_mobil:['./public/js/mobil.js']
    },
    output:{
        path:path.join(__dirname,'public'),
        filename:'js/[name].js'
    },
    mode:'development',
    devServer:{
        contentBase:'./public'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use:{
                    loader:'babel-loader'
                }
            }
        ]
    }
}




