var _ = require('busyman');
var model = require('./model');

var isDemoRunning = false;
var isD01Observed = false;
var isD02Observed = false;
var isD03Observed = false;
var isD04Observed = false;

var startDemoApp = function () {
    isDemoRunning = true;
    var qnode1 = model.qnode1,
        qnode2 = model.qnode2,
        qnode3 = model.qnode3,
        qnode4 = model.qnode4;

    //setTimeout(function () {
    //    toastInd('Client device d01 will join: Temp. + Humidity + Illum. Sensors');
    //}, 1000);

    setTimeout(function () {
        qnode1.connect('mqtt://localhost', function () {});
    }, 3000);

    //setTimeout(function () {
    //    toastInd('Client device d02 will join: On/Off Switch');
    //}, 4000);

    setTimeout(function () {
        qnode2.connect('mqtt://localhost', function () {});
    }, 6000);

    //setTimeout(function () {
    //    toastInd('Client device d03 will join: Buzzer + Light Bulb');
    //}, 7000);

    setTimeout(function () {
        qnode3.connect('mqtt://localhost', function () {});
    }, 9000);

    //setTimeout(function () {
    //    toastInd('Client device d04 will join: PIR + Flame Sensors');
    //}, 10000);

    setTimeout(function () {
        qnode4.connect('mqtt://localhost', function () {});
    }, 12000);

    //setTimeout(function () {
    //    toastInd('Try clicking on the Buzzer and Light Bulb');
    //}, 13000);

    setTimeout(function () {
        //toastInd('Someone light the Bulb up by the On/Off Switch');
        qnode2.so.write('onOffSwitch', 0, 'dInState', 1, function (err, val) {});

        setTimeout(function () {
            qnode2.so.write('onOffSwitch', 0, 'dInState', 0, function (err, val) {});
        }, 5000);
    }, 22000);

    setTimeout(function () {
        //toastInd('Auto light up when illumination < 50 lux');
        qnode1.so.write('illuminance', 1, 'sensorValue', 40, function (err, val) {});
    }, 30000);

    setTimeout(function () {
        //toastInd('Auto light up when PIR sensed someone walking around');
        qnode4.so.write('presence', 0, 'dInState', 1, function (err, val) {});

        setTimeout(function () {
            qnode4.so.write('presence', 0, 'dInState', 0, function (err, val) {});
        }, 6000);
    }, 36000);

    setTimeout(function () {
        //toastInd('Buzzing on fire detected!!');
        qnode4.so.write('dOut', 0, 'dOutState', 1, function (err, val) {});

        setTimeout(function () {
            qnode4.so.write('dOut', 0, 'dOutState', 0, function (err, val) {});
        }, 6000);
    }, 45000);

    //setTimeout(function () {
    //    toastInd('Demo Ended!');
    //}, 52000);

};

startDemoApp();