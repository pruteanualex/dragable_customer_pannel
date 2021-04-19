const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');
dotenv.config({path:'./config.env'});


// Data Base Connection


mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true, 
    useFindAndModify:false
}).then(result=>{
    console.log('Connected to DataBase');
    const port = process.env.PORT || '5000';
    const server = app.listen(port, ()=>{
        console.log('Server Is Running!!!!');
    });
    const io = require('./socket').init(server);
    io.on('connection',socket =>{
        console.log('Client Connected');
        socket.on('disconnect',() =>{
            console.log('Client Disconnected')
        })
    
    });

}).catch(err =>{
    console.log(err);
})


//Original Cod without socket

// mongoose.connect(process.env.DATABASE,{
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useUnifiedTopology: true, 
//     useFindAndModify:false
// }).then(result=>{
//     console.log('Connected to DataBase');
// }).catch(err =>{
//     console.log(err);
// })


// const port = process.env.PORT || '5000';
// app.listen(port, ()=>{
//     console.log('Server Is Running!!!!');
// });
