const http = require("http");
const fs = require("fs");

const port = 3001;

const items = [];

const handleResponse = (req, res) =>({code = 200, error = null, data= null})=>{
    res.setHeader('content-type', 'application/json')
    res.writeHead(code)
    res.write(JSON.stringify({data, error}))
    res.end()
}

const server = http.createServer((req, res) => {
    const response = handleResponse(req, res)

    
        // to add an item

    if (req.url === '/v1/items' && req.method === 'POST'){
        const data = [];
        req.on('data', (chunk)=> {
            console.log({chunk});
            data.push(chunk);
        });
        req.on('end', ()=>{
            const bufferBody = Buffer.concat(data).toString()
            console.log({bufferBody})
            const bodyOfRequest = JSON.parse(bufferBody)
            console.log({bodyOfRequest})
            items.push({...bodyOfRequest, id: Math.floor(Math.random() * 500).toString()})
            fs.writeFileSync('items.json', JSON.stringify(items, null, 2), function (err) {
                if (err) {
                    console.log(err);
                    return
                  } else {
                    console.log("written successfully");
                  }
            });
            console.log({items})
        })
        res.writeHead(201)
        res.end();
        
    }

    // to get all items

    if (req.url === '/v1/items' && req.method === 'GET'){

        const data = fs.readFileSync("items.json")
        const jsonData = JSON.parse(data)
        return response({
            data: jsonData,
            code: 200
        })
    }



    //to get one item

    if (req.url.startsWith('/v1/items/') && req.method === 'GET'){
        const id = req.url.split('/')[3]
        
        const data = fs.readFileSync("items.json")
        const jsonData = JSON.parse(data)

        const itemIndex = jsonData.findIndex((item)=> item.id === id)
        if (itemIndex === -1) {
            return response({
                code: 404,
                error: 'item not found'
            })
        }

        const item = jsonData[itemIndex]
        return response({
            data: item,
            code: 200
        })
    }


        // to update an item

    if (req.url.startsWith('/v1/items/') && req.method === 'PATCH'){
        const id = req.url.split('/')[3]

        const fullData = fs.readFileSync("items.json")
        const jsonData = JSON.parse(fullData)

        const itemIndex = jsonData.findIndex((item)=> item.id === id)
        if (itemIndex === -1) {
            return response({
                code: 404,
                error: 'item not found'
            })
        }

        const data = []
       
        req.on('data', (chunk)=> {
            console.log({chunk});
            data.push(chunk);
        });
        req.on('end', ()=>{
            const bufferBody = Buffer.concat(data).toString()
            console.log({bufferBody})
            const bodyOfRequest = JSON.parse(bufferBody)
            
            const item = {...jsonData[itemIndex], ...bodyOfRequest}
            jsonData[itemIndex] = item
            console.log({item})

            fs.writeFileSync('items.json', JSON.stringify(jsonData, null, 2), function (err) {
                if (err) {
                    console.log(err);
                    return
                  } else {
                    console.log("written successfully");
                  }
            });
            return response({
                data: item,
                code: 200
             })
        })
        
    }


    // to delete an item

    if (req.url.startsWith('/v1/items/') && req.method === 'DELETE'){
        const id = req.url.split('/')[3]

        const fullData = fs.readFileSync("items.json")
        const jsonData = JSON.parse(fullData)

        const itemIndex = jsonData.findIndex((item)=> item.id === id)
        if (itemIndex === -1) {
            return response({
                code: 404,
                error: 'item not found'
            })
        }
        jsonData.splice(itemIndex, 1)
        fs.writeFileSync('items.json', JSON.stringify(jsonData, null, 2), function (err) {
            if (err) {
                console.log(err);
                return
              } else {
                console.log("written successfully");
              }
        });
        return response({
            data: jsonData,
            code: 200
        })
    }
});

    

server.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
