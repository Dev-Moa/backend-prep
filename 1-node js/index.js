import http from "http"

const server = http.createServer((req,res)=>{
   if(req.url==="/"){
    res.end("<h1>Home</h1>")
   }else if(req.url==="/about"){
    res.end("<h1>about</h1>")
   } else {
    res.end("<h1>404 Not found</h1>")
   }
})

server.listen(8000,()=>{
    console.log("server running on",8000);
})
