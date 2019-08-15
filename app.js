const mqtt = require('mqtt'),
    ip = `192.168.0.11`;
var unhandledTopics = [],
    client = mqtt.connect(`tcp://${ip}:2883`),
    // Handle our topics
    handleInstantDemand = (message) => {
        let reading = JSON.parse(message),
            time = new Date(reading.time).toLocaleTimeString(),
            demand = reading.demand / 1000
        console.log(`[${time}] Instant Demand: ${demand}KW`)
    };

    client.on(`connect`, () => {
        client.subscribe(`event/metering/instantaneous_demand`) 
        client.subscribe(`#`)
        console.log(`Connected: ${client.connected}`)
    });

    client.on(`message`, (topic, message) => {
        switch (topic) {
            case `event/metering/instantaneous_demand`:
                return handleInstantDemand(message)
            //TODO more topics
        }
        console.log(`There's nothing to do with topic: ${topic} : ${message}`)
        unhandledTopics.push(`Topic: ${topic} Message: ${message}`) //debug point
    });
