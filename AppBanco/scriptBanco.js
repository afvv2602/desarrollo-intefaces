var doc;
doc = $(document);
doc.ready(inicializarEventos);

var dinero = 0;
var ingreso;
var retirada;
var dineroEnviar;
var numRojos = false;

function inicializarEventos() {
    $("#dinero").attr("value",dinero); //comenzamos con 0 euros
    $("#borrarHistorial").hide(); //ocultamos el boton de borrar historial

    var add = $("#add");
    var ret = $("#retirar");
    var agenda = $("#contactos");
    var env = $("#enviar");
    var borrarHis = $("#borrarHistorial");


    add.click(hacerIngreso);
    ret.click(retirarDinero);

    agenda.change(clickAgenda);
    env.click(enviarDinero);

    borrarHis.click(borrarHistorial);

    $("#contacto").click(function click(){
        alert("Selecciona un contacto de tu agenda."); //mensaje de aviso (caja de texto numero de teléfono readOnly)
    });

    $("#dinero").click(function click(){
        alert("Actualmente tienes "+$("#dinero").val()+"€");
    });
}

function hacerIngreso(){ //--------------------------------INGRESO

    if($("#ingreso").val() == 0) ingreso = 0; //si la caja de ingreso está vacía operamos con el 0
    else ingreso = parseFloat($("#ingreso").val());
        
    dinero = parseFloat($("#dinero").val());

    var operacion = (ingreso+dinero).toFixed(2); //calculamos el dinero que teníamos antes + el ingreso
    dinero = operacion; //actualizamos nuestra variable global dinero

    $("#dinero").attr("value",dinero);

    $("#ingreso").val(''); //vaciamos la textbox para ingresar otra cantidad

    //añadimos al historial de movimientos
    addToHistory("Se hizo un ingreso de <strong>"+ingreso+"€<strong> --- <strong>Dinero en la cuenta: "+dinero+"</strong>");
    comprobarNumRojos();
}

function retirarDinero(){ //--------------------------------RETIRAR

    if($("#retirada").val() == 0) retirada = 0;
    else retirada = parseFloat($("#retirada").val());
        
    dinero = parseFloat($("#dinero").val());

    if(!numRojos){ //si no estamos en numero rojos podemos hacer operaciones

        var operacion = (dinero-retirada).toFixed(2); //calculamos el dinero que teníamos antes + el ingreso
        dinero = operacion; //actualizamos nuestra variable global dinero

        addToHistory("Se retiró de la cuenta <strong>"+retirada+"€<strong> --- <strong>Dinero en la cuenta: "+dinero+"</strong>");
    }else{

        alert("No puedes retirar dinero en numeros rojos");
    }

    $("#dinero").attr("value",dinero);

    $("#retirada").val(''); //vaciamos la textbox para ingresar otra cantidad

    comprobarNumRojos();
}

function comprobarNumRojos(){ //comprobamos si estamos en numeros rojos

    if($("#dinero").val() < 0){

        $("#dinero").css("background-color","#FF0000");
        alert("Estás en números rojos, no podrás retirar dinero a partir de ahora.");
        numRojos = true;
    }else{

        $("#dinero").css("background-color","#FFFFFF");
        numRojos=false;
    }
}


function clickAgenda(){

    //metemos en el value de la caja de contacto lo que vale el id del option seleccionado
    $("#contacto").attr("value",$('#contactos option:selected').attr("id")); 
}


function enviarDinero(){

    if($("#dineroEnviar").val() != 0 && $('#contactos option:selected').attr("id") != 0){ //si hay algún campo vacío no se enviará el dinero

        if($("#dineroEnviar").val() == 0) dineroEnviar = 0;
        else dineroEnviar = parseFloat($("#dineroEnviar").val());
            
        dinero = parseFloat($("#dinero").val());

        if(!numRojos){ //si no estabamos en numeros rojos y los datos estaban correctos

            var operacion = (dinero-dineroEnviar).toFixed(2);
            dinero = operacion;

            var thisContacto = $('#contactos option:selected').val();
            var thisNumero = $('#contactos option:selected').attr("id");
            alert("Enviando "+dineroEnviar+"€ a "+thisContacto+" con número "+thisNumero); //mensaje generado
            addToHistory("Se enviaron <strong>"+dineroEnviar+"€<strong> a "+thisContacto+" con número "+thisNumero+" --- <strong>Dinero en la cuenta: "+dinero+"</strong>");

        }else{

            alert("No puedes enviar dinero en numeros rojos");
        }

        //actualizamos nuestro dinero
        $("#dinero").attr("value",dinero);

        //vaciamos las cajas de texto
        $("#dineroEnviar").val(''); //caja de cantidad de dinero a enviar
        $("#contacto").val(''); //caja de numero de telef
        $("#contactos option[id='0']").attr("selected", "selected"); //el id 0 es la opcion "Selecciona una opción"

        comprobarNumRojos();
    }else{ //si habia  algun campo vacío no se realizará el envío

        alert("No se pudo enviar. Rellena los campos vacíos.");
    }
}

function addToHistory(mensaje){
    $("#historial").append("<p>"+mensaje+"</p>"); //Colocamos el mensaje personalizado de cada movimiento
    $("#borrarHistorial").show();
}

function borrarHistorial(){
    $("#historial").empty(); //vaciamos los hijos de historial
    $("#borrarHistorial").hide(); //ocultamos el botón porque ya no habrá elementos
}