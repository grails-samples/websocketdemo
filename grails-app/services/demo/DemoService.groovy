package demo

import org.springframework.messaging.simp.SimpMessagingTemplate

class DemoService {
    SimpMessagingTemplate brokerMessagingTemplate

    void hello() {
        brokerMessagingTemplate.convertAndSend "/topic/hello", "hello from service!"
    }
}
