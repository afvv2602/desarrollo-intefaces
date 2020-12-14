var doc;
doc = $(document);
doc.ready(leerCookies);

var count;
var x = $("li");

//Funciones onClick
$("#an").click(function () {
    anadirCookie();
});

$("#resetear").click(function () {
    borrarCookie();
});


//Funciones normales
function anadirCookie() {
    count = x.size();
    valor = $("#anadir").val();
    Cookies.set(count, valor, { expires: 7, path: "/" });
}

function leerCookies(){
    $.Cookies.get();
}

function rellenarUl(){
    var lista = "";
    for (var i = 0; i < cookies.length; i++) {
        lista += "<li></li>";
    }
    $(".compradores").html(lista);
}


function borrarCookie(){
    $.removeCookie();
}
