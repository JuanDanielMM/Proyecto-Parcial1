var idProdOrden = new Array();
var cantOrden = new Array();
var preciosOrden = new Array();
const carrito = document.getElementById('cart');
const total = document.getElementById('costoVenta');
const catidad = document.getElementById('cantidad');

function resetAll(){
    idProdOrden = [];
    cantOrden = [];
    preciosOrden = [];
    total.innerText = 0;
    catidad.value = 0;
    while (carrito.rows.length > 1) {
        carrito.deleteRow(1);
    }
}