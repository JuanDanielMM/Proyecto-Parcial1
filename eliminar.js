const total = document.getElementById('costoVenta');
var idProdOrden = new Array();
var cantOrden = new Array();
var preciosOrden = new Array();

function eliminar(indice){
    console.log(idProdOrden);
    var casilla = "precio" + indice;
    var restando = document.getElementById(casilla).innerText
    total.innerText = parseFloat(total.innerText) - parseFloat(restando.replace(/\$/, ''));
    document.getElementById(indice).remove();
    delete idProdOrden[indice - 1];
    console.log(idProdOrden);
    delete console[indice - 1];
    delete cantOrden[indice - 1];
    delete preciosOrden[indice - 1];
    j--;
    i--;
}