


function getMessages(){
    $.ajax({
      method: "GET",
      url: "/messages"
    }).done( function(response){
        //console.log(response)

        var $chat = $("#chat");
        $chat.empty();

        for (var i = 0; i < response['messages'].length;i++){
            var message = response['messages'][i];
            console.log(message.sender,message.timestamp, message.text)

            $chat.append(message.timestamp +" "+  message.sender +" "+ message.text + "<br/>" )
        }
    }).complete( function() {
        setTimeout(getMessages, 5000)

    })
}

$("#chatsend").click( function(){
    $.ajax({
        method:"POST",
        url: "/send",
        data: JSON.stringify({"sender": $("#sender").val(), "text": $("#chattext").val()}),
        contentType: 'application/json;charset=UTF-8'
    })

})

getMessages()


