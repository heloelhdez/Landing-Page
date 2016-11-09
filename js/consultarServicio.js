$(function() {
    
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
    var service = 0;

    $('#paseoBtn').focusin(function() {
        $('#daycaregroup').hide();
        $('#hotelgroup').hide();
        $('#paseogroup').show();
        service = 1;
    });
    
    $('#guardBtn').focusin(function() {
        $('#hotelgroup').hide();
        $('#paseogroup').hide();
        $('#daycaregroup').show();
        service = 2;
    });

    $('#hotelBtn').focusin(function() {
        $('#daycaregroup').hide();
        $('#paseogroup').hide();
        $('#hotelgroup').show();
        service = 3;
    });

    var size = 0;
    
    //SELECCION DE TAMAÑO DE MASCOTA
    $('#smallBtn').focusin(function() {
        size = 1;
    });

    $('#mediumBtn').focusin(function() {
        size = 2;
    });
    
    $('#bigBtn').focusin(function() {
        size = 3;
    });
    
    $('#extraBtn').focusin(function() {
        size = 4;
    });
    
    $('#checkBtn').on('click', function (e) {
        
        var mail = $('#mailInput').val();
        
        if (mail != "" && service != 0 && size != 0) {
                    
            $('#alertCons').html('<div class="alert alert-info" role="alert" style="padding: 8px 16px;">Cotizando...</div>');

            var daycareValue = parseInt($('#daycareVal').val());
            console.log("guarderia: " + daycareValue);

            var hotelValue = parseInt($('#hotelVal').val());
            console.log("hotel: " + hotelValue);

            var paseoValue = parseInt($('#paseoVal').val());
            console.log("paseo: " + paseoValue);

            var serviceValue = 0;

            var cost = 0;

            switch (service) {
                case 1:
                    serviceValue = paseoValue;
                    cost = 45 + (size * 5);
                    if (size >= 3) {
                        cost = cost + 10;
                    }
                    break;
                case 2:
                    serviceValue = daycareValue;
                    cost = 40 + (size * 20);
                    if (size == 4) {
                        cost = cost - 10;
                    }
                    break;
                case 3:
                    serviceValue = hotelValue;
                    cost = 90 + (size * 30);
                    if (size == 4) {
                        cost = cost - 10;
                    }
                    cost = cost * hotelValue;
                    break;
            }
            console.log(cost);

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
                $('#alertCons').html('<div class="alert alert-success" role="alert" style="padding: 8px 16px;">Gracias por tu interés. La cotización es de $' + cost + '.00</div>');
            }, function(error) {
                $('#alertCons').html('<div class="alert alert-danger" role="alert" style="padding: 8px 16px;">Hubo un problema en la conexión, vuelve a intentarlo más tarde.</div>');
            });

        } else {
            $('#alertCons').html('<div class="alert alert-danger" role="alert" style="padding: 8px 16px;">Debes llenar todos los campos para cotizar.</div>');
        }

    });

});