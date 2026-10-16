function fibs(number) {
    let start = 0;
    let fibarrry = [];
    if (number <= 0) return fibarrry;
    if (number === 1) return fibarrry.push(start);
    
    fibarrry = [0,1];
    for (i = 2; i < number; i++) {
        const addnext = fibarrry[i - 1] + fibarrry[i - 2];
        fibarrry.push(addnext);

    }
    return  fibarrry;
}

console.log(fibs(8));
console.log(fibs(10));

console.log('the next outputs are recursion functions');

function fibsRec(number) {
    console.log('this was printed recursively');
    if (number <= 0 ) return [];
    if (number === 1) return [0];
    if (number === 2) return [0,1];
    const fibArray = fibsRec(number - 1);
    const nextNumber = fibArray[fibArray.length - 1] + fibArray[fibArray.length - 2];

    fibArray.push(nextNumber);
    return fibArray;
}

console.log(fibsRec(8));
console.log(fibsRec(10));
