export default class ProductManager {
    #margin = 0;
    #properties = {
        id : {
            required : false,
            default: null,
            type: 'autoincrement',
        },
        title : {
            required : true,
            type: 'string',
        },
        description : {
            required : true,
            type: 'string',
        },
        price : {
            required : true,
            type : 'float'
        },
        created_at : {
            required : true,
            type : 'date'
        },
    };
    static #items = [];
    constructor(options = {}){
        this.setOptions(options);
    }
    static getIndex(callback){
        return ProductManager.#items.findIndex(callback);
    }
    static findByID(id){
        let index = ProductManager.getIndex(element => element.id == id);
        return index < 0 ? null : ProductManager.#items[index];
    }
    static findByTitle(title){
        let index = ProductManager.getIndex(element => element.title == title); 
        return index < 0 ? null : ProductManager.#items[index];
    }

    setMargin(margin){
        this.#margin = margin;
    }
    getMargin(){
        return this.#margin;
    }
    setOptions(options = {}){
        if(typeof options.margin !== typeof undefined){
            this.setMargin(options.margin);
        }
    }
    #calculateID(){
        return ProductManager.#items.length + 1;
    }
    add(item){
        let errors = [];
        Object.entries(this.#properties).forEach(property => {
            console.log(property);
            let propertyName = property[0];
            property = property[1];
            let has_default = typeof property.default !== typeof undefined && property.default !== null;
            property.required = typeof property.required !== typeof undefined && property.required;
            if(typeof item[propertyName] === typeof undefined && has_default){
                item[propertyName] = property.default;
            }
            if(property.required && typeof item[propertyName] === typeof undefined){
                errors.push(`${propertyName} missing`);
            }
        });
        
        let checker = errors.length === 0 ? ProductManager.findByTitle(item) : null;
        if(checker !== null){
            errors.push(`Element ${item.title} already exists`);
        }
        if(errors.length === 0){
            item.id = this.#calculateID();
            item.price += item.price * this.#margin
            ProductManager.#items.push(item);
            console.log('product added', item)
        }else{
            console.log("errors",errors);
        }
    }
    addEasy(title, description, price, created_at = new Date()){
        return this.add({
            title, 
            description,
            price,
            created_at
        });
    }
    getAll(){
        return ProductManager.#items;
    }
}