const cart = {
    notebook : 1,
    mouse : 2,
    keyboard : 1,
    display : 1,
};
let total = 0;
Object.entries(cart).forEach(element => {
    let value = element[1];
    total += value;
    return total ;
})
console.log(Object.keys(cart));
console.log(Object.values(cart));

console.log(total);
