const express = require("express") 
const app = express()
const server = require("http").Server(app)
const io = require("socket.io")(server)
const routProduct = require("./rout/productRout")//  modo commonjs viejo?  es6 usan import? preguntar
const port = process.env.PORT || 8080

const arr = []

;
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended:false}))



app.use("/api",routProduct)
app.use("/api",routProduct) //middelware para que funcione usar siempre el patch

//engine
app.set("views", __dirname +"/views") // busca carpeta en esta dirreccion
app.set("view engine","ejs")// usa este motor de plantilla con esta  extencion. 

io.on("connection", (socket)=>{
    console.log("usuario conectado")
    socket.emit("messaje_back", arr)
    socket.on("messaje_cliente",(data)=>{
        console.log(data)
    })
    socket.on("cliente_form",(data)=>{
        console.log(data)
        arr.push(data)
        io.sockets.emit("messaje_back", arr)
    })
})


server.listen(port,()=>{
    console.log("server is run port 8080") // usar con manejo de errores .on 
})