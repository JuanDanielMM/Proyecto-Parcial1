const total = document.getElementById('costoVenta');
const catidad = document.getElementById('cantidad');
var idProdOrden = new Array();
var cantOrden = new Array();
var preciosOrden = new Array();
var i= 0, j= 1;

$("#add").click(function(){
    if (cantidad.value != 0) {
        var total_aux = (parseFloat(precio.innerText).toFixed(2) * cantidad.value);
        $("#cart").append('<tr id="' + j + '"><td>' + name + '</td><td>' + cantidad.value + '</td><td id="precio' + j + '"> $'+ total_aux + '</td><td><button id="' + j + '" onclick="eliminar(this.id)"><span>Eliminar</span></button></td></tr>');
        if (total.innerText !=  "") {
            var ant = parseFloat(total.innerText).toFixed(2);
            total.innerText = (parseFloat(total.innerText) + total_aux);
        }else {
            total.innerText = total_aux;
        }
    }else{
        window.alert("Ingrese una cantidad valida");
    }
    idProdOrden[i] = id;
    cantOrden[i] = cantidad.value;
    preciosOrden[i] = parseFloat(precio.innerText);
    i++;
    j++;
});