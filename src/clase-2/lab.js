const tickets = async () => {
    //check package.json:10
    const {default: Tickets} = await import("./tickets.js");
    let instance = new Tickets;
    instance.add({});
    console.log("events", instance.getAll());
    instance.addEasy("dance",'Las Heras Park',10);
    console.log("events", instance.getAll());
    return 
};

tickets();