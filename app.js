const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const bodyParser = require('body-parser');
const app = express();
const getAdminPannel = require('./routes/pannelRoute');
const getView = require('./routes/viewRoutes');
const getUsers = require('./routes/usersRoutes');
const getProducts = require('./routes/productRoutes');

app.set('view engine', 'pug');
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'public')));

//Parse Data from the body
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//Parsewr data from the cookie
app.use(cookieParser());

app.use((req,res,next)=>{
    next();
})


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(cors());


app.use('/api/v1/services',getAdminPannel);
app.use('/api/v1/users',getUsers);
app.use('/api/v2/products',getProducts);
//Views routes
app.use('/',getView);

app.all('*', (req,res,next)=>{

    
    res.status(404).json({
       status:"fail",
       message:`Can't find ${req.originalUrl}`
    });
    const err = new Error(`Can't find ${req.originalUrl}`)
    err.status = 'fail',
    err.statusCode = 404

});



module.exports = app;

