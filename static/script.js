$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3002/data',
        success: function (affichInfo) {
            
            for (var i = 0; i < affichInfo.length; i++) {
                console.log(affichInfo);
                   
                
                $('#clients').append('<article><h2>' + name + '"</h2><p>'  + address + ' </p></article>');
                
            };
            
        },
        error: function (resultat, statut, erreur) {

            alert('ERROR 404');
        }
    });
});