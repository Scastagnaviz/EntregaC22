const express = require ('express');
//const conten1 = require('./contenedor')
const  PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('./public'))


const {Router} = express;
const routerP= Router();
app.use('/api/productos', routerP);

const fs = require('fs');  


// server.on('error', error=>{
//     console.log(error);
//     console.log('Error en el servidor')
//     })

