$(document).ready(function() {

    const port = 3002;
    //
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3002/data',
        success: function (affichInfo) {
            //console.log(affichInfo)
            for (var i = 0; i < affichInfo.length; i++) {
                //console.log(affichInfo[i]);
                   
                var info = "";
                
                // if(affichInfo.id === ''){
                //     info = name + address;
                // }
               
                $('#clients').append('<article class="mb-2 bg-info"><h3>Nom: ' + affichInfo[i].name + '</h3><p>Genre: '  + affichInfo[i].genre + ' </p><button id="'+affichInfo[i]._id+'" data-id="'+affichInfo[i]._id+'" class="btn btn-dark mb-3" onclick="supprimer(this.id)">Supprimer</button></article>'); 
            };
           
        },
        error: function (resultat, statut, erreur) {

            alert('ERROR ERROR');
        }
    });
    //


    $('#btn').click(function () {
         var name = $("#nom").val();
         var genre = $("#genre").val();
        $.ajax({
            type: 'POST',
            data: {
                name: name,
                genre: genre
            },
            url: 'http://localhost:3002/insert',
            success: function (infos) {
                var name = $("#nom").val(" ");
                var genre = $("#genre").val(" ");
                // $('#clients').html('<article><h3>Nom: ' + info[i].name + '</h3><p>Genre: '  + info[i].genre + ' </p></article>'); 
                for (var j = 0;j< infos.lenght; j++){
                    $('#clients').html('<article><h3>Nom: ' + infos[j].name + '</h3><p>Genre: '  + infos[j].genre + ' </p></article>');  
                }
                
            },
            error: function (e) {
                console.log("erreur :", e);
            }
    });       
});

    $('#btnSupp').click(function () {
        console.log($("#btnSupp"));
        var name = $("#nom").val();
        var genre = $("#genre").val();
        $.ajax({
            type: 'POST',
            data: {
                name: name,
                genre: genre
            },
            url: 'http://localhost:3002/insert',
            success: function (info) {
                var name = $("#nom").val(" ");
                var genre = $("#genre").val(" ");
                $('#clients').remove('<article><h3>Nom: ' + info[i].name + '</h3><p>Genre: ' + info[i].genre + ' </p></article>');
            },
            error: function (e) {
                console.log("erreur :", e);
            }
        });
    });

});


function supprimer(id){
    console.log("supp => "+id);
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3002/supprimer/'+id,
        success: function (reponse) {
            console.log("ok");
            location.reload();
        },
        error: function (e) {
            console.log("erreur :", e);
        }
    });
}