<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>

    <asset:javascript src="application"/>
    <asset:javascript src="spring-websocket"/>

    <script type="text/javascript">
        $(function () {
            var socket = new SockJS("${createLink(uri: '/stomp')}");
            var client = Stomp.over(socket);

            client.connect({}, function () {
                client.subscribe("/topic/message", function (message) {
                    $("#messageList ul").append('<li class="message-content">'.concat(message.body, '</li>'));
                });
            });

            $("#messageButton").click(function () {
                client.send("/app/message", {}, JSON.stringify($('#newMessage').val()));
                $('#newMessage').val("");
            });
        });
    </script>
</head>

<body>
<div class="message-container">
    <div class="form-group">
        <div class="input-group">
            <g:textField name="newMessage" class="form-control"
                         placeholder="Enter Message Here"/>
        </div>
    </div>

    <button id="messageButton" class="btn btn-primary">Send Message</button>

    <div id="messageList">
        <h2>Messages:</h2>
        <ul class="messages">

        </ul>
    </div>
</div>
</body>
</html>