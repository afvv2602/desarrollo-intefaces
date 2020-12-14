$(document).ready(function () {
    var lista = "";
    $("#mayoria_edad").click(mostrar);
    var sw = false;

    function mostrar() {

        if ($("#mayoria_edad").prop("checked")) {
            $("#formulariomayores").css("display", "block");
            $("#formulariomenores").css("display", "none");
            $("#formulariomayores").addClass("clasecss");
            sw = true;
        } else {
            $("#formulariomayores").css("display", "none");
            $("#formulariomenores").css("display", "block");
            $("#formulariomenores").addClass("clase1css");
            sw=false;

        }

    }
    $("#ver").click(function () {
        mostrarResultados();
    });
    $("#restaurar").click(function () {
        vaciarUl();
    });

    function mostrarResultados() {

        var nombre = $("#nombre").val();
        var edadMa = $("#edadMa").val();
        var edadMe = $("#edadMe").val();
        if (edadMa >= 18 && sw==true) {
            var profesion = $("#profesion").val();
            var experiencia = $("#experiencia").val();
            lista += "<li>" + nombre + " tiene " + edadMa + " años trabaja como " + profesion + " y tiene experiencia " + experiencia + "</li>";       
        } else if (edadMe < 18 && sw== false) {
            var estudios = $("#estudios").val();
            lista += "<li>" + nombre + " tiene " + edadMe + " años y estudia " + estudios + "</li>";
        } else if (edadMa < 18 && sw ==true) {
            lista += "<li>" + nombre + " es menor de edad y tiene marcada la casilla de mayores " + "</li>";
   
        } else if (edadMe > 18 && sw== false) {
            lista += "<li>" + nombre + " es mayor de edad y no tiene marcada la casilla de mayores " + "</li>";
        }
        $("ul").html(lista);
    }
    function vaciarUl(){
        lista = "";
        $("ul").html(lista);
    }

})
