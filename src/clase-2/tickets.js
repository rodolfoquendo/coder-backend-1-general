export default class Tickets {
    #margin = 0.15;
    #ticketProperties = [
        "name" ,
        "venue",
        "price",
        "capacity",
        "date",
    ];
    static #events = [];
    constructor(){
        
    }
    #calculateID(){
        return Tickets.#events.length;
    }
    add(item){
        let errors = [];
        Object.values(this.#ticketProperties).forEach(property => {
            if(typeof item[property] === typeof undefined){
                errors.push(`${property} missing`);
            }
        })
        if(errors.length === 0){
            item.id = this.#calculateID();
            item.participants = [];
            Tickets.#events.push(item);
            console.log('event added', item)
        }else{
            console.log("errors",errors);
        }
    }
    addEasy(name, venue, price, capacity = 50, date = new Date().toLocaleDateString){
        price +- price * this.#margin;
        return this.add({
            name, 
            venue,
            price,
            capacity, 
            date
        });
    }
    getAll(){
        return Tickets.#events;
    }
}