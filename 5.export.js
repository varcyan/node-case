var name;
exports.setName = function(val) {
    name = val;
};
exports.sayHello = function() {
    console.log("hello," + name);
};

function Hello() {
    var name;
    this.setName = function(thyName) {
        name = thyName;
    };
    this.sayHello = function() {
        console.log("Hello " + name);
    };
}
// 需要通过require('moduleName').Hello读取
// exports.Hello = Hello;
// 引入后可以直接读取hello
module.exports = Hello