const base = (value1, value2, callback) => new Promise((resolve,reject) => {
    if(value1 === 0 || value2 === 0) reject(`operation not useful`);
    const result = callback(value1, value2);
    return result > 0 ? resolve(result) : reject(`${result} is negative`);
});
const add = (value1, value2) => base(value1, value2, (value1, value2) => value1 + value2);
const substract = (value1, value2) => base(value1, value2, (value1, value2) => value1 - value2);
const multiply = (value1, value2) => base(value1, value2, (value1, value2) => value1 * value2);
const divide = (value1, value2) => base(value1, value2, (value1, value2) => value1 / value2);


add(1,2)
    .then(response => console.log(response))
    .catch(error => console.error(error))
add(1,0)
    .then(response => console.log(response))
    .catch(error => console.error(error))
add(1,-4)
    .then(response => console.log(response))
    .catch(error => console.error(error))

try{
    let result = await substract(1,2);
    console.log(result);
}catch(error){
    console.error(error)
}

try{
    let result = await substract(1,0);
    console.log(result);
}catch(error){
    console.error(error)
}

try{
    let result = await substract(1,-4);
    console.log(result);
}catch(error){
    console.error(error)
}

multiply(1,2)
    .then(response => console.log(response))
    .catch(error => console.error(error))
multiply(1,0)
    .then(response => console.log(response))
    .catch(error => console.error(error))
multiply(1,-4)
    .then(response => console.log(response))
    .catch(error => console.error(error))

divide(1,2)
    .then(response => console.log(response))
    .catch(error => console.error(error))
divide(1,0)
    .then(response => console.log(response))
    .catch(error => console.error(error))
divide(1,-4)
    .then(response => console.log(response))
    .catch(error => console.error(error))