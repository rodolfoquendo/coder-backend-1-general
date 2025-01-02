const purchases = [
    {
        jeans : {
            qty : 3, 
            price : 50
        },
        shirts : {
            qty : 2, 
            price : 30
        },
        shoes : {
            qty : 1, 
            price : 80
        },
        sunglasses : {
            qty : 2, 
            price : 50
        },
        hats : {
            qty : 2, 
            price : 50
        },
    },
    {
        sunglasses : {
            qty : 1, 
            price : 50
        },
        sandals : {
            qty : 2, 
            price : 50
        },
        skirts : {
            qty : 3, 
            price : 35
        },
        shoes : {
            qty : 2, 
            price : 80
        },
        swim_suit : {
            qty : 1, 
            price : 30
        },
    }
];

console.log(purchases);
let qty = 0,
    total = 0;
const items = [];
Object.entries(purchases).forEach(purchase => {
    purchaseNumber = purchase[0];
    purchase = purchase[1];
    console.log(`purchase-${purchaseNumber}`,purchase);
    Object.entries(purchase).forEach(item => {
        itemName = item[0];
        item = item[1];
        console.log(`item-${itemName}`,item);
        qty += item.qty;
        total += item.qty * item.price;
        console.log(`items sold so far: ${qty}`);
        console.log(`total so far: ${total}`);
        if ( typeof items[itemName] === typeof undefined) {
            items[itemName] = {
                qty : 0,
                total : 0,
            }
        }
        items[itemName].qty += item.qty;
        items[itemName].total += item.qty * item.price;
    })
})
console.log(`items sold: ${qty}`);
console.log(`total : ${total}`);
console.table(items);