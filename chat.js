const express = require ('express');
const {Server: IOServer} = require('socket.io');
const {Server: HttpServer} = require('http');

const {randomize5} = require('./public/faker');
const {schema,normalize,denormalize} = require('normalizr');
const util = require('util');

const  PORT = 8080;
const app = express();

const httpServer = new HttpServer(app)
const io = new IOServer (httpServer)

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('./public'))

const fs = require('fs');  
const messages= [];


httpServer.listen(PORT,()=> console.log('SERVER ON'))



const author = new schema.Entity('author')
const comment = new schema.Entity('comentario',{
    commenter:author    
})
const mensajes = new schema.Entity('mensajes',{
    author:author   ,
    comments: [comment]
})
const chat= new schema.Entity('chat',{
    posts: [mensajes]
})

function print(objeto){
    console.log(util.inspect(objeto,false,12,true));
}






  app.get('/',function(req,res){
    res.render('pages/index');

    io.on('connection',function(socket){
        console.log('Un cliente se ha conectado');
        
        socket.emit('messages',messages);

        socket.on('new-message',data=>{
          
        messages.push(data);
     
        io.sockets.emit('messages',messages);
            }) ;
       
            
         });
        });

        app.get('/api/productos-test',function(req,res){
          let productos= randomize5();
            //console.log(productos);
            
          res.render('pages/index',{
            productos : productos,
           });
          io.on('connection',function(socket){
            console.log('Un cliente se ha conectado');
            
            socket.emit('messages',messages);
    
            socket.on('new-message',data=>{
              
            messages.push(data);
            fs.writeFileSync('./data/mensajes.json',JSON.stringify(messages)) ;
            io.sockets.emit('messages',messages);
                }) ;

            console.log('............... El ORISHINAL------------');
            console.log(JSON.stringify(messages).length);
            console.log('............... El NORMALIZADO------------');
            const normalizeData= normalize({mensajes},chat);
            console.log(JSON.stringify(normalizeData).length);
            print(normalizeData);
            });
            console.log('Compresion de mensajes igual a '+ (JSON.stringify(normalizeData).length/JSON.stringify(messages).length)*100+ '%');
        })


