const http = require('http')
const fs = require('fs')
const { error } = require('console')

const server = http.createServer((req, res) => {
    if(req.url === '/'){ 
        res.write("<html><head></head><body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body></html>")
       return res.end()
    }
    if(req.url === '/message' && req.method === 'POST'){
        const body = [] ;
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk)
        })
        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString()
            const message = parseBody.split('=')[1]
            fs.writeFileSync('message.txt', message,err => {

                res.statusCode =303;
                res.setHeader('Location','/')
               return res.end()   
            })
        })
        // fs.writeFileSync('sample.txt','hello')

    }
    res.setHeader('Content-Type', 'text/html')
    res.write("<html><head></head><body><h1>Hello World</h1></body></html>")
    res.end()
    // process.exit()
})

server.listen(3000)