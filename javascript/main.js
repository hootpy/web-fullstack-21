// console.log("Hello World");
//
//
//
// var c = true;
//
// console.log(typeof c);
//
// c = 100;
//
// console.log(typeof c);
//
//
// let obj = {
//     name: "Test",
//     age: 18,
//     obj2: {
//         name: "Hello",
//         age: 20,
//     }
// };
//
//
// console.log(obj["name"]);
// console.log(obj.obj2.age)
//
// obj.c = 100;
//
// console.log(obj);
//
// delete obj.obj2;
// console.log(obj);
//
// obj.name = "new name";
//
// console.log(obj);
//
// const arr = [1,23,true];
//
// console.log(arr)
// console.log(arr.length);
// console.log(arr)
//
// arr.push(100);
// console.log(arr);
//
// console.log(arr);
//
// function aFunc(x,y) {
//     a = x - y;
//     return a
// }
// console.log(aFunc(3,4))
//
// const bFunc = function () {
//     console.log("B")
// }
//
// const cFunc = () => {
//     console.log("C")
// }
//
//
// bFunc()
// cFunc()
//
//
// const now = new Date();
//
// console.log(now);
//
// console.log(/([A-Z])\w+/g.test("Jfdkflskvnks"))
//
//
// throw new Error("This is error");
//

// Funtion scope
// var a = 10;
//
// function print() {
//     var b = 50;
//     console.log(a);
//     console.log(b);
// }
//
// print()

// Block scope { }

// let aBlock = 10;
//
// function printBlock() {
//     let bBlock = 300;
//
//     if (true){
//         let cBlock = 1000;
//         var c = 2332
//
//         console.log(cBlock);
//         console.log(c)
//     }
//
//
// }
//
// printBlock();

// const  countDown = function (count) {
//     for(let i = count; i >= 0; i--){
//         setTimeout(function () {
//             console.log(i);
//         },1000*(count - i));
//     }
// }



// countDown(5)


const  print = function (message) {
    console.log(message);
}

const aFunc = function(callBack) {
  callBack("HelloWorld");
}

aFunc(print)



