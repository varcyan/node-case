//readfile.js
// 异步
var fs = require("fs");
fs.readFile("assets/file.txt", "utf-8", function(err, data) {
    if (err) {
        console.error(err);
    } else {
        console.log(data + 'not sync');
    }
});
console.log("end.");

// 同步
var data1 = fs.readFileSync('assets/file.txt', 'utf-8');
console.log(data1);
console.log('end.'); 