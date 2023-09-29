
// this is es6 method of importing
import * as nod from "./feature.js"
import express from "express";
import path from "path"
let app =express()

// this is old way but still works
const http =require('http')


// console.log(nod);
// console.log(nod.nod1);

// when we use   "type": "module", in package json then
// we can't access __dirname feature
// console.log(__dirname)


// here like this we can access path.
let dir = path.resolve()
console.log(dir);
