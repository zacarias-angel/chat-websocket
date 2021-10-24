const express = require("express")
const multer = require("multer")
const contenedor = require("../promesas.js")// importo mis metodos 

///////////////// seting multer//////////////////////
let storage = multer.diskStorage({
    destination:function(req,res,cb){
        cb(null, "./public/upload")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
let subirImg = multer({storage})
////////////////////////////////////////////////////////////

const datos = new contenedor("./data/data.txt")
const {Router} = express// desestructuto  express por que es un objeto gigante
const router = new Router()//instancio router por que es el constructor ? revisar !!! 


router.get("/product", (req,res)=>{
    res.render("index",{})// render recive el archivo Y el objeto donde van las variables... busca solo en la carpta views
})
router.get("/detalle", async (req,res)=>{
   let arr = await datos.leer()
    res.render("detalles",{datos:arr})// render recive el archivo Y el objeto donde van las variables... busca solo en la carpta views
})

router.post("/product",subirImg.single("img"), async (req,res)=>{
    ///obtengo datos de la img con multer
    let file = req.file 
    console.log(req.file)
    if(!file){
        res.send({messaje:"error al subir el archivo de imagen"})
        return
    }
    let modificador = file.destination
   let  remplazo = modificador.split("/").slice(2).join("/")
 console.log(remplazo)

 let ruta = remplazo + "/"+ file.originalname
    // omptengo datos del fomr con req.body
    let {nombre,precio,img} = req.body

    let datosObtenidos = {nombre,precio,img:ruta}
    await datos.save(datosObtenidos)
    res.redirect("product")

})
module.exports = router // exporto router para usaro en las otras paginas. 