// operador exponencial

const precio  = 1000;
const interes = 0.05;
const cuotas = 12;

const total = precio + (precio * (cuotas * (interes / 12)));
console.log(total);

/**
 * Array includes
 */

const paymentMethods = [
    "card",
    "paypal",
    "transfer",
];

const userMethod = "crypto";
const userSanitized = userMethod.trim().toLowerCase().replaceAll(" ","");
const isAccepted = paymentMethods.includes(userSanitized);
console.log(`${!isAccepted ? 'not' : ''} accepted`);