const EventEmitter = require('events');

// using event handler 
class Logger extends EventEmitter {
    
    // when we define function in class we do not need to write function keyword

    log(message){
        console.log('msg')
        console.log(this)
        this.emit('start', {id: 1 , url:'http://'});
    }
}

module.exports = Logger ; 


