let inventario = []
let formStock
let inId
let inNombre
let inCantidad
let inPrecio
let inImg

class Stock{
    constructor(id, nombre, cantidad, precio, img){
        this.id = id
        this.nombre = nombre
        this.cantidad = cantidad
        this.precio = precio
        this.img = img
    }
    precioMas = (precio) => (this.precio += precio)
    precioMenos = (precio) => (this.precio -= precio)
    stockMas = (cantidad) => (this.cantidad += cantidad)
    stockMenos = (cantidad) => (this.cantidad -= cantidad)
}

function initElements(){
    formStock = document.getElementById('formStock')
    inNombre = document.getElementById('inNombre')
    
}