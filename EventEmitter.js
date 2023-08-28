const Logger = require('./logger');
const logger = new Logger();

// register a listener
logger.on('start', (arg) => {
    console.log('listerner invoked' ,arg)

})


logger.log('msg')