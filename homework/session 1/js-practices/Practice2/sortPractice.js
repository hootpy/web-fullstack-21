'use strict'

function sort(input) {
  let sorted_list = [];
  while (input.length !== 0){
    let min = Math.min.apply(null,input);
    sorted_list.push(min)
    let index = input.indexOf(min);
    input.splice(index,1);
  }
  return sorted_list; // Remove this line and change to your own algorithm
}

module.exports = sort
// input.sort((a,b) => a-b)