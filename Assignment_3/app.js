const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const homepagePath = path.join(__dirname, "public", "index.html");
const notFound = path.join(__dirname, "public", "404.html");
const db = path.join(__dirname, "db", "items.json")
const items = [];

// ------------navigate to “/index.html”, I should see a simple webpage of the student-----------
app.get("/", (req, res) => {
  res.status(200).sendFile(homepagePath);
});



//-------------To create item---------------------
app.post("/v1/items", (req, res) => {
  const bodyOfRequest = req.body;
  console.log(bodyOfRequest);
  items.push({
    ...bodyOfRequest,
    id: Math.floor(Math.random() * 500).toString(),
  });
  fs.writeFileSync(
    db,
    JSON.stringify(items, null, 2),
    function (err) {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log("written successfully");
      }
    }
  );
  console.log({ items });
  res.status(201).json(items)
});

// ------------------To get all items-----------------------
app.get('/v1/items', (req, res)=>{
    const data = fs.readFileSync(db);
    const jsonData = JSON.parse(data);
    res.status(201).json(jsonData);
})


// ---------------To get one item----------------------
app.get('/v1/items/:id', (req,res)=>{
    const id = req.params.id
    const dbData = fs.readFileSync(db);
    const data = JSON.parse(dbData)
    const itemIndex = data.findIndex((data)=> data.id === id)
    if (itemIndex === -1){
        res.status(400)
        console.log("item not found")
    }
    const item = data[itemIndex]
    res.status(200).json(item)
    console.log(item)
})

// -----------------To update an item---------------
app.patch('/v1/items/:id', (req, res)=>{
    const itemUpdate = req.body
    const id = req.params.id

    const dbItems = fs.readFileSync(db)
    const parsedBody = JSON.parse(dbItems)
    const itemIndex = parsedBody.findIndex((data)=> data.id === id)
    if (itemIndex === -1){
        res.status(400)
        console.log("item not found")
    }
    
    
    const item = {...parsedBody[itemIndex], ...itemUpdate}
    parsedBody[itemIndex] = item
    fs.writeFileSync(db, JSON.stringify(parsedBody, null, 2),
    function (err) {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log("written successfully");
      }
    } )
    res.status(200).json(parsedBody)
})


// ---------------- To delete an item----------------
app.delete('/v1/items/:id', (req, res)=>{
    const id = req.params.id
    const dbItems = fs.readFileSync(db)
    const data = JSON.parse(dbItems)
    const itemIndex = data.findIndex((item)=>item.id === id)
    if (itemIndex === -1){
        res.status(404)
        console.log("item does not exist")
        return
    }
    data.splice(itemIndex, 1)
    fs.writeFileSync(db, JSON.stringify(data, null, 2), (err)=>{
        if (err) {
            console.log(err);
            return
        } else{
            console.log("deleted succesfully")
        }
    })
    res.status(200).json(data)
})



//-------------- when I navigate to “{random}.html” it should return with a 404 page-----------------
app.get("*", (req, res) => {
    res.status(200).sendFile(notFound);
  });


app.listen(3001, () => {
  console.log("Hello");
});
