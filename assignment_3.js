const http = require('http')

const HOSTNAME = 'localhost'
const PORT = 8000

// TO CREATE SERVER
const server = http.createServer(requestHandler);
server.listen(PORT, HOSTNAME, () => {
    console.log('Hello world')
})

// Return “Hello world” from the response
// Ensure when you navigate to the server on the browser, “Hello world” is returned.
function requestHandler (req, res){
    console.log(req)
    res.end('Hello world')
}