var idProdOrden = new Array();
var cantOrden = new Array();
var preciosOrden = new Array();

$.ajaxSetup({
  beforeSend: function (xhr) {
    xhr.setRequestHeader(
      "Authorization",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDBkOTIzM2I4YmVkOWFiZGQ3YTQwNzI5ZmUxNTNjZGEzYTk4YTI4Nzc4OTJkYmFiNjk0YTE1MTM5NjM4YTcxMTYwYmZiMjQxZTUxMTUxMTUiLCJpYXQiOjE2MjE5ODE1MzMsIm5iZiI6MTYyMTk4MTUzMywiZXhwIjoxNjUzNTE3NTMzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.CmbVQDYPbG1s6GbUlPPGVUlzIae74ZTbDGJvq8-BBWQQEJBHGxDRTk5bTr6e-376a8CAb1wD8Lro9E094rapTPR2zpBY4So9_llWry5JbAMkxYA7TLArFvpXTkfPSV0gi4n5hj5qpT_hKzI38ASrnOgnlhGrzP15buirWmGfQ251VQQzTPM4Mr4xZ5L6EMwLh5dk0cjWOkLyh6LsizAYX7IiFr9FpZUvjOmTOqOXveWvglgAdpvgVyhsDbI9UkBaSBZG5DtTSSci3laXpQbkfPTY4oEqUvBqVtQa5meSPJJD-W95yZV6PSIHeh5YgXlbRSbyKSGJ9ap5qw-rVDw2-2C0lGZO3as4EtlDlAhy4v_41-pInDfvC3QQ32OjvTN112f9IiU9r8LLicN6bqWC-Utr836R0kQqJD38rwztXYCR2CIgizLAEj4C_NLafwFCKjKgstACox6GXaLNbnn1KBJDR4qpnqKOKjzxFpRblN1LZNxx1LEyCgosgXaMCUHhwMS47MFLS3pIERucNocMzBgbItmSRC8rTpicIbaIkkfoXpLHSOhn-s5bJ3vt22RRXy-IqDFHrdta4HLJnjL3TSepkhRmX9rHqL6zqQpkGN1QB6CZvgG2MWmmLsFHkUBb90LUGU6LoA8zPDd8qx7fz6_BX0qwooa-GDoTM8f_SdU"
    );
  },
});

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

form.addEventListener('submit', e => {
    e.preventDefault();
    console.log(obj);
    idProdOrden = $.grep(idProdOrden,function(n){return n == 0 || n});
    cantOrden = $.grep(cantOrden,function(n){return n == 0 || n});
    preciosOrden = $.grep(preciosOrden,function(n){return n == 0 || n});
    console.log(idProdOrden);
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
    console.log(obj);


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