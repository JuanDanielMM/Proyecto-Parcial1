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

requestProducts.done(function (response) {
  productos = response;
  console.log(productos);
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
  console.log(id);
}

requestProducts.fail(function (jqXHR, textStatus, errorThrown) {
  alert(textStatus, errorThrown);
});