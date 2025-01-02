const calculate = async () => {
    //check package.json:10
    const {default: Calculator} = await import("./calc.js");
    let instance = new Calculator;
    console.log(instance.add(1,2,3,4,5,6,7,8,9));
};
calculate();