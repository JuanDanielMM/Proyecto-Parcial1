var i= 0, j= 1;

const Peso = document.getElementById('pesoVenta');
const total = document.getElementById('costoVenta');
const cambio = document.getElementById('campoCambio');
const recibido = document.getElementById('inputCalcCambio');
const catidad = document.getElementById('cantidad');
const form = document.querySelector('form');
const carrito = document.getElementById('cart');

$.ajaxSetup({
  beforeSend: function (xhr) {
    xhr.setRequestHeader(
      "Authorization",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDBkOTIzM2I4YmVkOWFiZGQ3YTQwNzI5ZmUxNTNjZGEzYTk4YTI4Nzc4OTJkYmFiNjk0YTE1MTM5NjM4YTcxMTYwYmZiMjQxZTUxMTUxMTUiLCJpYXQiOjE2MjE5ODE1MzMsIm5iZiI6MTYyMTk4MTUzMywiZXhwIjoxNjUzNTE3NTMzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.CmbVQDYPbG1s6GbUlPPGVUlzIae74ZTbDGJvq8-BBWQQEJBHGxDRTk5bTr6e-376a8CAb1wD8Lro9E094rapTPR2zpBY4So9_llWry5JbAMkxYA7TLArFvpXTkfPSV0gi4n5hj5qpT_hKzI38ASrnOgnlhGrzP15buirWmGfQ251VQQzTPM4Mr4xZ5L6EMwLh5dk0cjWOkLyh6LsizAYX7IiFr9FpZUvjOmTOqOXveWvglgAdpvgVyhsDbI9UkBaSBZG5DtTSSci3laXpQbkfPTY4oEqUvBqVtQa5meSPJJD-W95yZV6PSIHeh5YgXlbRSbyKSGJ9ap5qw-rVDw2-2C0lGZO3as4EtlDlAhy4v_41-pInDfvC3QQ32OjvTN112f9IiU9r8LLicN6bqWC-Utr836R0kQqJD38rwztXYCR2CIgizLAEj4C_NLafwFCKjKgstACox6GXaLNbnn1KBJDR4qpnqKOKjzxFpRblN1LZNxx1LEyCgosgXaMCUHhwMS47MFLS3pIERucNocMzBgbItmSRC8rTpicIbaIkkfoXpLHSOhn-s5bJ3vt22RRXy-IqDFHrdta4HLJnjL3TSepkhRmX9rHqL6zqQpkGN1QB6CZvgG2MWmmLsFHkUBb90LUGU6LoA8zPDd8qx7fz6_BX0qwooa-GDoTM8f_SdU"
    );
  },
});

var requestProducts = $.ajax({
  url: "https://atlas.soltrees.com/api/v1/products",
  method: "GET",
});

const select = document.getElementById("producto");
const precios = [];
var productos = [];
const precio = document.getElementById('costoUnitario');
var name;
var id;
var idProdOrden = new Array();
var cantOrden = new Array();
var preciosOrden = new Array();

requestProducts.done(function (response) {
  productos = response;
  for (let index = 0; index < response.data.length; index++) {
    const opt = document.createElement('option');
    opt.value = index;
    opt.innerHTML = response.data[index].attributes.nombre;
    precios[index] = parseFloat(response.data[index].attributes.precio).toFixed(2);
    select.appendChild(opt);
  }
  precio.innerHTML = precios[0];
  name = productos.data[0].attributes.nombre
  id = productos.data[0].attributes.id;
});

function actualizar(opcion) {
  precio.innerHTML = precios[opcion.value];
  name = productos.data[opcion.value].attributes.nombre;
  id = productos.data[opcion.value].attributes.id;
}

requestProducts.fail(function (jqXHR, textStatus, errorThrown) {
  alert(textStatus, errorThrown);
});

function eliminar(indice){
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

var datos = [];
var obj = {
        url: "https://atlas.soltrees.com/api/v1/generar-orden",
        method: "POST",
        data: {
            'data': {
                'type': "orders",
                'attributes': {
                    'client_id': 1,
                    'client_address_id': 1,
                },
            },
            'linked': {
                'orderItems': [
                    {
                        
                    },
                ],
            },
        },
        dataType: "json",};

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

form.addEventListener('submit', e => {
    e.preventDefault();
    idProdOrden = $.grep(idProdOrden,function(n){return n == 0 || n});
    cantOrden = $.grep(cantOrden,function(n){return n == 0 || n});
    preciosOrden = $.grep(preciosOrden,function(n){return n == 0 || n});
    for (let index = 0; index < idProdOrden.length; index++) {
        
        datos.push({
            'data': {
                'attributes': {
                    'tipo_producto_id': idProdOrden[index],
                    'quantity': cantOrden[index],
                    'price': preciosOrden[index],
                },
            },
        });
    }

    obj.data.linked.orderItems = datos;

    var requestOrders = $.ajax(obj);

    requestOrders.done(function (response) {
        console.log(response);
        window.alert("orden creada");
    });

    requestOrders.fail(function (jaXHR, textStatus, errorThrown) {
        alert(textStatus, errorThrown);
   });
   resetAll();
});
