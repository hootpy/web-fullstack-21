'use strict'

function search(input, target) {
  let indexOfTarget = -1;
    for(let i = 0; i <= input.length - 1; i++){
      if (input[i] === target){
        indexOfTarget = i;
      }
    }
  return  indexOfTarget;  // Remove this line and change to your own algorithm
}

module.exports = search
//input.findIndex(x => x === target)