var util = require("util");
function Person() {
    this.name = "byvoid";

    this.toString = function() {
        return this.name;
    };
    this.sayName = function (name) {
		return name + 'sayName'
	}
}
var obj = new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj, true));
