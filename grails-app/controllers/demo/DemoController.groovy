package demo

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo

class DemoController {

    def index() {}

    @MessageMapping("/message")
    @SendTo("/topic/message")
    protected String message(String message) {
        message
    }
}
