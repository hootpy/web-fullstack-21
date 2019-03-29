'use strict'

function generate(testLengthArray){
    let arrayData = [];
    let generateTypeList = [0,1,2,3];

    testLengthArray.forEach(function (arrayLength) {
        for(let k = 0; k < arrayLength; k++){
            let generateType =  generateTypeList[Math.floor(Math.random() * generateTypeList.length)]
            if(generateType === 0){
                arrayData.push({
                    input: [],
                    output: -1,
                })
            } else if(generateType === 1){
                let inputArray = [];
                inputArray.push(Math.floor(Math.random()*20000 - 10000))
                arrayData.push({
                    input: inputArray,
                    target: inputArray[0],
                    output: 0
                })
            } else if(generateType === 2){
                let inputArray = [];
                inputArray.push(Math.floor(Math.random()*20000 - 10000))
                arrayData.push({
                    input: inputArray,
                    target: inputArray[inputArray.length -1],
                    output: inputArray.length -1
                })
            } else if(generateType === 3){
                let inputArray = [];
                inputArray.push(Math.floor(Math.random()*20000 - 10000))
                while (true){
                    var index = Math.random()*(inputArray.length)
                    if(index !== 0 && index !== inputArray.length -1){
                        arrayData.push({
                            input: inputArray,
                            target: inputArray[index],
                            output: index,
                        })
                        break;
                    }
                }

            }


        }
    })
     return arrayData;
}
//   return Array.from({length : testLengthArray.length})
//     .map(item => ({
//       input: Array.from({length: item}).map(item => []),
//       target: 0,
//       output: -1
//     })
//   ); // Remove this line and change to your own algorithm
// }

module.exports = generate
