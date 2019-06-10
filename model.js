var MqttNode = require('mqtt-node'),
    SmartObject = require('smartobject');

// We need 8 gadgets: 
// qnode1, so1: Temperature, Humidity, Illuminance
// qnode2, so2: Switch
// qnode3, so3: Buzzer, Light
// qnode4, so4: Pir, Flame

var qnode1, qnode2, qnode3, qnode4;

var so1 = new SmartObject(),
    so2 = new SmartObject(),
    so3 = new SmartObject(),
    so4 = new SmartObject();

so1.init('temperature', 0, { sensorValue: 20, units: 'cel' });
so1.init('humidity', 0, { sensorValue: 50, units: 'percent' });
so1.init('illuminance', 1, { sensorValue: 200, units: 'lux' });

so2.init('onOffSwitch', 0, { dInState: 0 });

so3.init('buzzer', 0, { onOff: 0 });
so3.init('lightCtrl', 0, { onOff: 0 });

so4.init('presence', 0, { dInState: 0 });
so4.init('dOut', 0, { dOutState: 0, appType: 'flame' });

//------------------------------------------------------------
qnode1 = new MqttNode('d01', so1);
qnode2 = new MqttNode('d02', so2);
qnode3 = new MqttNode('d03', so3);
qnode4 = new MqttNode('d04', so4);

qnode1.on('ready', function () {
    console.log(">> MQTT d01 node is ready. But not connect to a server yet");
    var so = qnode1.getSmartObject();
    setInterval(function () {
        so.write('temperature', 0, 'sensorValue', randomFloat(18, 26), function (err, val) {});
    }, 2800);

    setInterval(function () {
        so.write('humidity', 0, 'sensorValue', randomFloat(40, 70), function (err, val) {});
    }, 5000);
    setInterval(function () {
        so.write('illuminance', 1, 'sensorValue', randomInt(50, 1000), function (err, val) {});
    }, 8000);
    qnode1.emit('connect');
});

qnode1.on('error', function (err) {
    console.log(err);
});

qnode1.on("registered", function() {
  console.log(">> MQTT d01 node is registered to a server");
});

qnode1.on("login", function() {
  console.log(">> MQTT d01 node logs in the network");
});

qnode2.on('ready', function () {
    console.log(">> MQTT d02 node is ready. But not connect to a server yet");
    // switch, nothing auto change
    qnode2.emit("connect");
});

qnode2.on("error", function(err) {
  console.log(err);
});

qnode2.on("registered", function() {
  console.log(">> MQTT d02 node is registered to a server");
});

qnode2.on("login", function() {
  console.log(">> MQTT d02 node logs in the network");
});

qnode3.on('ready', function () {
    console.log(">> MQTT d03 node is ready. But not connect to a server yet");
    // buzzer and light, nothing auto change
    qnode3.emit("connect");
});

qnode3.on("error", function(err) {
  console.log(err);
});

qnode3.on("registered", function() {
  console.log(">> MQTT d03 node is registered to a server");
});

qnode3.on("login", function() {
  console.log(">> MQTT d03 node logs in the network");
});


qnode4.on('ready', function () {
    console.log(">> MQTT d04 node is ready. But not connect to a server yet");
    // pir and flame, nothing auto change
    qnode4.emit("connect");
});

qnode4.on("error", function(err) {
  console.log(err);
});

qnode4.on("registered", function() {
  console.log(">> MQTT d04 node is registered to a server");
});

qnode4.on("login", function() {
  console.log(">> MQTT d04 node logs in the network");
});

function randomFloat(min, max) {
    var num = (Math.random() * (max - min) + min) * 10;
    return Math.floor(num) / 10;
}

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

exports = module.exports = {
    qnode1: qnode1,
    qnode2: qnode2,
    qnode3: qnode3,
    qnode4: qnode4
};
