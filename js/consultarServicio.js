$(function() {
    
    //POSIICONA ELEMENTO AL FONDO DEL PARENT
    $('.pull-down').each(function() {
        var $this = $(this);
        $this.css('margin-top', $this.parent().height() - $this.height())
    });
        
    //ACTIVA TOOLTIPS
    $('[data-toggle="tooltip"]').tooltip();
    
    //PREPARA LOS SLIDER
    $('#daycareVal').slider({
        formatter: function(value) {
            return value;
        }
    });

    $('#hotelVal').slider({
        formatter: function(value) {
            return value;
        }
    });

    $('#paseoVal').slider({
        formatter: function(value) {
            return value;
        }
    });
        
    //VARIABLE PARA NOMBRE DEL SERVICIO
    var service = 0, serv = "";

    $('#paseoBtn').focusin(function() {
        $('#daycaregroup').hide();
        $('#hotelgroup').hide();
        $('#paseogroup').show();
        service = 1;
        serv = "paseo";
    });
    
    $('#guardBtn').focusin(function() {
        $('#hotelgroup').hide();
        $('#paseogroup').hide();
        $('#daycaregroup').show();
        service = 2;
        serv = "guardería";
    });

    $('#hotelBtn').focusin(function() {
        $('#daycaregroup').hide();
        $('#paseogroup').hide();
        $('#hotelgroup').show();
        service = 3;
        serv = "hospedaje";
    });

    var size = 0, tam = "";
    
    //SELECCION DE TAMAÑO DE MASCOTA
    $('#smallBtn').focusin(function() {
        size = 1;
        tam = "pequeño";
    });

    $('#mediumBtn').focusin(function() {
        size = 2;
        tam = "mediano";
    });
    
    $('#bigBtn').focusin(function() {
        size = 3;
        tam = "grande";
    });
    
    $('#extraBtn').focusin(function() {
        size = 4;
        tam = "extra grande";
    });
    
    $('#checkBtn').on('click', function (e) {
        
        //OBTIENE VALOR INGRESADO EN MAIL
        var mail = $('#mailInput').val();
        
        //CHECA QUE NO HAY CAMPOS VACIOS
        if (mail != "" && service != 0 && size != 0) {
                    
            //AVIZA QUE COMIENZA A ENVIAR DATOS
            $('#modaltitle').html('<h3>¡Gracias por tu interés!</h3>');
            $('#modalcontent').html('<p>Estamos procesando tu solicitud<br>...</p>');
            
            $('#modalCost').modal('show');

            //OBTIENE EL VALOR INGRESADO PARA EL CASO CORREPONDIENTE
            var daycareValue = parseInt($('#daycareVal').val());
            console.log("guarderia: " + daycareValue);

            var hotelValue = parseInt($('#hotelVal').val());
            console.log("hotel: " + hotelValue);

            var paseoValue = parseInt($('#paseoVal').val());
            console.log("paseo: " + paseoValue);

            var serviceValue = 0;

            var cost = 0, servtime = "";

            switch (service) {
                case 1:
                    serviceValue = paseoValue;
                    cost = 45 + (size * 5);
                    if (size >= 3) {
                        cost = cost + 10;
                    }
                    servtime = serviceValue + " minutos";
                    detalles = "Descanso para agua<br>Snack al terminar.";
                    break;
                case 2:
                    serviceValue = daycareValue;
                    cost = 40 + (size * 20);
                    if (size == 4) {
                        cost = cost - 10;
                    }
                    servtime = serviceValue + " horas";
                    detalles = "Sesión de actividades al aire.<br>Hora de comida.";
                    break;
                case 3:
                    serviceValue = hotelValue;
                    cost = 90 + (size * 30);
                    if (size == 4) {
                        cost = cost - 10;
                    }
                    cost = cost * hotelValue;
                    servtime = serviceValue + " noches";
                    detalles = "Sesión de actividades al aire.<br>2 comidas al día.<br>Libertad para dormir donde quiera.";
                    break;
            }

            //CARGA DE PARSE
            Parse.initialize("5MUjnjMwd8whYbxWY2pWqAv0QMZ3MHGStiMqRt3y", "T3cth1vnjqfGfC8VWNqf5R9Lyvp6QzDzTEk3DqdF");
            Parse.serverURL = 'https://parseapi.back4app.com/';

            var Consulta = Parse.Object.extend("Consulta");
            var cons = new Consulta();

            cons.set("mail", mail);
            cons.set("petSize", size);
            cons.set("serviceID", service);
            cons.set("serviceValue", serviceValue);

            cons.save().then(function(u) {
                $('#modalcontent').html('<table class="table table-striped"><tbody>' +
                                        '<tr><td>Servicio</td><td>' + serv + '</td></tr>' +
                                        '<tr><td>Duración</td><td>' + servtime + '</td></tr>' +
                                        '<tr><td>Mascota</td><td>' + tam + '</td></tr>' +
                                        '<tr><td>Detalles</td><td>' + detalles + '</td></tr>' +
                                        '<tr><td>Total</td><td><strong>$' + cost + '.00</strong></td></tr>' +
                                        '</tbody></table><hr>' +
                                        '<button id="closeBtn" class="btn btn-block btn-default btn-lg">GRACIAS</button>' +
                                        '<a href="#" class="btn btn-block btn-default btn-lg">¡QUIERO COMPRAR!</a>');
                $('#closeBtn').on('click', function (e) {
                    $('#modalCost').modal('toggle');
                });
            }, function(error) {
            });

        } else {
            $('#modaltitle').html('<h3>No tenemos toda la información</h3>');
            $('#modalcontent').html('<p>Debes completar el formulario para consultar los servicios.</p>' +
                                    '<button id="closeBtn" class="btn btn-block btn-default btn-lg">Regresar</button>');
            $('#modalCost').modal('toggle');
            
            $('#closeBtn').on('click', function (e) {
                $('#modalCost').modal('toggle');
            });
        }

    });

});