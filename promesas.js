const {promises:fs} = require('fs');

class Contenedor {
    constructor(ruta){
        this.ruta = ruta
    }
    async leer(){
        try{
          let datoProducto = await fs.readFile(this.ruta , "utf-8")
          console.log(typeof(datoProducto))
        return JSON.parse(datoProducto)
        }catch(error){
          return []
        }
        
    }
    async save(producto){
    
        const datoProducto = await this.leer()
        
        console.log(typeof(datoProducto))
        let nuevoid 
        if(datoProducto.length === 0){ // pruegnto 
        nuevoid = 1
        console.log("adentro del if")
        }else{
        nuevoid = datoProducto[datoProducto.length - 1].id + 1
        console.log("adentro del else")
        }
         const nuevoproducto = {...producto, id:nuevoid}
        datoProducto.push(nuevoproducto)
        try{
        await fs.writeFile(this.ruta, JSON.stringify(datoProducto,null,2))
        }catch(error){
        return "error al escribir"
        }
      }
}

const productos = new Contenedor("./data/data.txt")
const main = async () => {
  
 
    //let aux5 = await productos.leer()
    //let aux6 = await productos.modificar()

}
main()


module.exports = Contenedor;