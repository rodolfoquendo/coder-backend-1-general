export default class Calculator {
    add = (...numbers) => numbers.reduce((total, number) => total + number,0);
    substract = (...numbers) => numbers.reduce((total, number) => total - number,0);
}