"use strict";
function arraySum(arr) {
    let sum = 0, num;
    while ((num = arr.pop()) !== undefined) {
        sum += num;
    }
    return sum;
}
function printTriangles(n) {
    const nums = [];
    for (let i = 0; i < n; i++) {
        nums.push(i);
        console.log(arraySum(nums));
    }
}
printTriangles(5);
