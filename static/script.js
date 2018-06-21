$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:6002/data',
        success: function (affichInfo) {
            console.log(affichInfo)
            for (var i = 0; i < affichInfo.length; i++) {
                console.log(affichInfo);
                   
                var info = "";
                
                // if(affichInfo.id === ''){
                //     info = name + address;
                // }
               
                $('#clients').append('<article><h3>Nom: ' + affichInfo[i].name + '</h3><p>Genre: '  + affichInfo[i].genre + ' </p></article>'); 
            };
           
        },
        error: function (resultat, statut, erreur) {

            alert('ERROR ERROR');
        }
    });


    $('#btn').click(function () {
         var name = $("#nom").val();
         var genre = $("#genre").val();
        $.ajax({
            type: 'POST',
            data: {
                name: name,
                genre: genre
            },
            url: 'http://localhost:6002/data',
            success: function (info) {
                var name = $("#nom").val(" ");
                var genre = $("#genre").val(" ");
                $('#clients').append('<article><h3>Nom: ' + info[i].name + '</h3><p>Genre: '  + info[i].genre + ' </p></article>'); 
            },
            error: function (e) {
                console.log("erreur :", e);
            }
    });       
});
});