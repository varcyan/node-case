// 事件监听
//event.js
var EventEmitter = require("events").EventEmitter;
var event = new EventEmitter();

// 注册some_event事件监听器
event.on("some_event", function() {
    console.log("some_event occured.");
});
setTimeout(function() {
    // 发送事件
    event.emit("some_event");
}, 1000);
