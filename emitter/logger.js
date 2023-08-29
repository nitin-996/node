const EventEmitter = require('events');

// using event handler 
class Logger extends EventEmitter {
    sum = () => {
        return 5+6 ;
    }
    // when we define function in class we do not need to write function keyword

    log(){
        console.log('msg')
        this.emit('start', {id: 1 , url:'http://'});
       
    }

}

module.exports = Logger ; 


