/**
 * Spread operator: ...
 */
const list1 = [
    "Netbook",
    "Mouse",
    "Keyboard",
];
const list2 = [
    "Printer",
    "Display",
]
const listCombination1 = list1;
console.log(list1, list2, listCombination1);
list1[0] = "Notebook";
console.log(list1, list2, listCombination1); // is the same memory space
const listCombination2 = [
    ...list1, 
    ...list2
];
list1[0] = "Netbook";
list2[0] = "iPhone";

console.log(list1, list2, listCombination1, listCombination2); // now is different


/**
 * Rest Operator: ... (as function argument)
 */
function getTotal(...prices){
    return prices.reduce( (total, price) => total + price, 0);
}
console.log(getTotal(10,20,30,40,50,60,70,80,90)); // 450

const getTotalArrow = (...prices) => prices.reduce( (total, price) => total + price, 0);

console.log(getTotalArrow(10,20,30,40,50,60,70,80,90)); // 450