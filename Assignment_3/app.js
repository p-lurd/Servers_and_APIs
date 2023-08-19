const express = require("express");
const fs = require("fs");
const path = require("path");
const { postItem,getItems, getOneItem, updateItem, deleteItem } = require("./controller");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const homepagePath = path.join(__dirname, "public", "index.html");
const notFound = path.join(__dirname, "public", "404.html");
const db = path.join(__dirname, "db", "items.json")
const items = [];





//-------------To create item---------------------
app.post("/v1/items", postItem);

// ------------------To get all items-----------------------
app.get('/v1/items', getItems)


// ---------------To get one item----------------------
app.get('/v1/items/:id', getOneItem)

// -----------------To update an item---------------
app.patch('/v1/items/:id', (req, res)=>{
   updateItem(req, res);
})


// ---------------- To delete an item----------------
app.delete('/v1/items/:id', (req, res)=>{
    deleteItem(req, res);
})





app.listen(3001, () => {
  console.log("Hello");
});
