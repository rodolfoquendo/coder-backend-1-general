const ProductManager = async () => {
    //check package.json:10
    const {default: ProductManager} = await import("./ProductManager.js");
    let instance = new ProductManager;
    instance.add({});
    console.log("events", instance.getAll());
    instance.addEasy("dance",'Las Heras Park',10);
    instance.addEasy("dance",'Las Heras Park',10);
    console.log("events", instance.getAll());
    return 
};

ProductManager();