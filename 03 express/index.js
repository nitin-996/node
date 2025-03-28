import express from "express";
import logger from "./logger.js";
import morgan from "morgan";


const app = express();
const port = 3002;
const morganFormat = ":method :url :status :response-time ms";


app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// convert the json data into javascript object.
app.use(express.json());

let teaData = [];
let id = 1;

app.post("/addtea", (req, res) => {
  const { name, price } = req.body;

  const newtea = {
    id: id++,
    name,
    price,
  };
  teaData.push(newtea);
  res.status(200).send(newtea);
});

app.get("/allitems" , (req, res)=>{


   res.status(200).send(teaData)
    
   
})

app.get("/teas/:id", (req, res) => {
  // RETURNS FIRST ELEMENT WHICH IT FINDS
  // everything from params is string thats why we change it into int.
  const tea = teaData.find((tea) => tea.id === parseInt(req.params.id));
  console.log(tea);

  if (!tea) {
    res.status(404).send("tea is not found");
  }

  res.status(200).send(tea);
});

app.delete("/removeTea/:id", (req, res) => {
  const index = parseInt(req.params.id);

  const count = index - 1;
  console.log(count);

  const newData = teaData.splice(count, 1);
  res.status(200).send(teaData);
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
