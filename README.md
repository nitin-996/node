# node
node basics

# EventEmmiter

https://nodejs.dev/en/learn/the-nodejs-event-emitter/

# Keywords list

break: Terminates the current loop or switch statement.

case: Defines a case clause in a switch statement.

catch: Catches and handles errors in a try-catch block.

class: Defines a class (ES6) for creating objects and prototypes.

const: Declares a block-scoped constant variable.

continue: Skips the rest of the current iteration of a loop and starts the next iteration.

debugger: Pauses the execution of code and opens a debugging session.

default: Specifies the default case in a switch statement.

delete: Deletes an object property or an element from an array.

do: Starts a do-while loop, executing the loop body at least once.

else: Defines the alternative block in an if statement.

export: Exports functions, objects, or values to make them available in other modules.

extends: Specifies the parent class for inheritance (ES6).

false: Represents the Boolean value "false".

finally: Specifies a block of code to be executed after a try-catch block, regardless of whether an exception was thrown or caught.

for: Starts a for loop for iterative operations.

function: Declares a function with optional parameters.

if: Specifies a condition to be executed in an if statement.

import: Imports functions, objects, or values from other modules.

in: Checks if a property exists in an object.

instanceof: Checks if an object is an instance of a particular class.

let: Declares a block-scoped mutable variable.

new: Creates an instance of an object based on a constructor function.

null: Represents the absence of value or a null value.

return: Specifies the value a function should return.

super: Calls methods on a parent class.

switch: Starts a switch statement for multi-way branching.

this: Refers to the current object.

throw: Throws an exception to be caught by a try-catch block.

true: Represents the Boolean value "true".

try: Starts a block of code to be tested for errors.

typeof: Returns a string indicating the data type of a value.

var: Declares a function-scoped mutable variable (ES5).

void: Specifies that an expression has no value.

while: Starts a while loop to execute a block of code while a condition is true.

with: Note: Avoid using this keyword, as it's not recommended due to its potential to create ambiguous and error-prone code.

yield: Pauses and resumes a generator function.

# httpModule Vs express

https://www.geeksforgeeks.org/what-are-the-differences-between-http-module-and-express-js-module/

# npm 

npm init => you have to give the details manually.
npm init --yes => it takes the takes automatically.



# jshint
Static analysis tool for JavaScript.

# package.json

^4.6.4  equals to 4.x.x , it means that whenever it find its minor & patch version to update it will do it automaticall.

~4.6.4 equals to 4.6.x it means that whenever it find its patch version to update it will do it automaticall.

to statically mention the version type without caret and tilde charactors type only version number like 4.6.4 

# npm commands

npm list --depth=0
npm view mongoose dependencies
npm view mongoose versions

npm outdated  = shows the packages version on which you would like to update.
npm update  = only update minor & patches

npm-check-updates = used to update major version update , it made changes in package.json file. after this need to run npm i command.

npm un <package name> = to uninstall the package. un stands for unimstall.

# publish own module to npm

https://stackabuse.com/publishing-a-nodejs-module-to-npm/

npm login = this command it for existed used
OR
npm useradd = to create new user
npm publish = to publish own module to node.

node module name must be unique.

if we updated the some feature og module then use below command to update the version.

npm version <minor/major/patch>  

# rest api

Representational state transfer

npm i -g npm = will update npm to its latest version.


# Ejs

_it is html template engine_

[use of EJS](https://www.geeksforgeeks.org/use-ejs-as-template-engine-in-node-js/).

# Middleware

[express middleware](https://expressjs.com/en/guide/using-middleware.html)

# async programing

[three methods to handle the async program](https://www.freecodecamp.org/news/asynchronous-programming-in-javascript/)

# mongoose

collection resembles table
document resembles the rows 

### Model in mongodb

[use of model](https://javascript.plainenglish.io/node-js-models-and-database-3836f0c7f2da)

[mongoose model](https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/#:~:text=Mongoose%20Schema%20vs.-,Model,updating%2C%20deleting%20records%2C%20etc.)

# w3 School

[node](https://www.w3schools.com/nodejs/nodejs_mongodb_createcollection.asp)

# operator in mongodb

[comparision operator](https://www.mongodb.com/docs/manual/reference/operator/query/)

# 30 day node

[node articles](https://www.nodejsera.com/nodejs-tutorial-day3-regular-expressions.html)

# regular expression

[w3 js RG](https://www.w3schools.com/js/js_regexp.asp)


# json.parse and json.stringify

[parsing method](https://www.geeksforgeeks.org/what-is-difference-between-json-parse-and-json-stringify-methods-in-javascript/)

# mongoose pagination

[Create a Paginated API with MongoDB and Node JS](https://javascript.works-hub.com/learn/how-to-create-a-paginated-api-with-mongodb-and-node-js-6e1e3)

# mongoose populate

[what is the use if populate](https://www.geeksforgeeks.org/mongoose-populate/)







