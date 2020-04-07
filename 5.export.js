var name
exports.setName = function (val) {
    name = val
}
exports.sayHello = function () {
    console.log('hello,' + name);
}