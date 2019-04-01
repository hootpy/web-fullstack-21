const fs = require('fs')
const obj = {
    name: "Hien",
    age: 19,
}

const jsonObj = JSON.stringify(obj);

// console.log("Hello World");
//
// console.log("Start")
// fs.writeFile("test.json",
//     jsonObj,
//     function (error) {
//     if(error) console.log(error)
//     else  console.log("Write file")
// });
//
// console.log("End")



// fs.readFile("test.txt",
//     {encoding:"utf-8"},
//     function (error,data) {
//     if(error) console.log(error)
//         else console.log(data);
//     });


const a = fs.readFileSync("test.json",{encoding: "utf-8"});
console.log(JSON.parse(a).name);