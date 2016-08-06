


function getMessages(){
    $.ajax({
      method: "GET",
      url: "/messages"
    }).done( function(response){
        //console.log(response)

        var $chat = $("#chat");
        $chat.empty();

        $chat.append(" <table id=\"chatTable\" class=\"table table-striped\"> ");


        for (var i = 0; i < response['messages'].length;i++){
            var message = response['messages'][i];
            //console.log(message.sender,message.timestamp, message.text)
            var shinyDate = new Date(message.timestamp);


           // $chat.append("<tr>" + "<td>"+shinyDate.getHours() + ":" + shinyDate.getMinutes()+"</td>" + "<td> <span class='sender'>"+  message.sender +"</span></td> "+"<td>"+ message.text + "</td></tr>" );
            $("#chatTable").append("<tr>" + "<td style=\"width:5%\">"+shinyDate.getHours() + ":" + shinyDate.getMinutes()+"</td>" + "<td style=\"width:10%\"> <span class='sender'>"+  message.sender +"</span></td> "+"<td>"+ message.text + "</td></tr>" );
        }



         $('#chat').scrollTop($('#chat')[0].scrollHeight - $('#chat')[0].clientHeight);

    }).complete( function() {

        setTimeout(getMessages, 1000)
    })
}

$("#chatsend").click( function(){
    $.ajax({
        method:"POST",
        url: "/send",
        data: JSON.stringify({"sender": $("#sender").val(), "text": $("#chattext").val()}),
        contentType: 'application/json;charset=UTF-8'
    })
    $("#chattext").val("");


})

getMessages()


