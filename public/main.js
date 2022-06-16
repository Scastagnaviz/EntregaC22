const socket =io.connect();


    function renderMsj(data){
        const html = data.map((elem,index)=> {
            return ('<div><strong style="color:blue;" >' + elem.author.alias +'</strong>: <em style="color:#7D6608" >[ ' + elem.author.avatar+ ']</em><i style="color:#087D18">'+ elem.text +'</i></div>')
        }).join(" ");
        document.getElementById('messages').innerHTML = html;
        }
    
        
        socket.on('messages',data=>
            {renderMsj(data);     
            });
    
        function addMessage(e){
         
            const mensaje = {
                author:{
                    id : document.getElementById('id').value,
                    nombre : document.getElementById('nombre').value,
                    apellido : document.getElementById('apellido').value,
                    edad : document.getElementById('edad').value,
                    alias : document.getElementById('alias').value,
                    avatar : document.getElementById('avatar').value
                },
                text: document.getElementById('texto').value,
        }

            socket.emit('new-message',mensaje);
            return false;
        }