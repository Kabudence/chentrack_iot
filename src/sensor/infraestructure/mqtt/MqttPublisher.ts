import mqtt from "mqtt";

export class MqttPublisher {
    private client;

    constructor(brokerUrl: string) {
        this.client = mqtt.connect(brokerUrl);
    }

    publish(topic: string, message: string): void {
        this.client.publish(topic, message, (err) => {
            if (err) {
                // Puedes loguear o lanzar error según tu arquitectura
                console.error("MQTT Publish error:", err);
            }
        });
    }
}
