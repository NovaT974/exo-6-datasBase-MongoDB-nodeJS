$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:6002/data',
        success: function (affichInfo) {
            console.log(affichInfo)
            for (var i = 0; i < affichInfo.length; i++) {
                console.log(affichInfo);
                   
                // var info = "";
                
                // // if(affichInfo.id === ''){
                // //     info = name + address;
                // // }
               
                $('#clients').append('<article><h2>Nom: ' + affichInfo[i].name + '</h2nodemon server.js><p>Genre: '  + affichInfo[i].genre + ' </p></article>'); 
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
                name: genre,
            },
            url: "http://localhost:6002/form",
            success: function (name, genre) {
                $('#nouveau-nom').append(name);
                $('#nouveau-genre').append(genre);
            },
            error: function (e) {
                console.log("erreur :", e);
            }
    });       
});
});