// 与export.js在同一目录下
var myModule = require('./5.export')
// myModule.setName('智')
// myModule.sayHello()

// 单次加载
var hello1 = require('./5.export');
// hello1.setName('BYVoid');
var hello2 = require('./5.export');
// hello2.setName('BYVoid 2');
// hello1.sayHello();  // BYVoid 2

var he = require('./5.export')
console.log(he)