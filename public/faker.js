let faker = require('faker');
faker.locale = 'es';

function randomize5(){
    let productos=[]
    for (let index = 0; index < 5; index++) {

        productos.push({
            nombre:faker.commerce.productName(),
            precio: faker.commerce.price(),
        })
        
    }
    return productos;


}
module.exports= {randomize5};


