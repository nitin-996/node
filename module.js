const url  = require("./app")

url.log('msg')

const path = require('path')

let pathobj = path.parse(__dirname)
console.log(pathobj)

const os = require('os')

let mem = os.freemem
let cpu = os.cpus

console.log(`${mem}`)  // 

const fs = require('fs')
