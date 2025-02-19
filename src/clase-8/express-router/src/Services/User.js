import crypto from "crypto"
export default class User {
    #__SECRET_KEY__ = 'asd';
    id = null;
    name = null;
    email = null;
    password = null;
    static items = [];
    static table = 'users';
    static getIndex(callback){
        return User.items.findIndex(callback);
    }
    static findByID(id){
        let index = User.getIndex(element => element.id == id);
        return index < 0 ? null : User.items[index];
    }
    static findByEmail(email){
        let index = User.getIndex(element => element.email == email);
        return index < 0 ? null : User.items[index];
    }
    static calculateID(){
        return User.items.length + 1;
    }
    constructor(id = null, name = null, email = null, password = null) {
        this.setID(id);
        this.setName(name);
        this.setEmail(email);
        this.setPassword(password);
    }
    #setToItems(callback){
        let index = User.getIndex(callback);
        if(index < 0 ){
            User.items.push(this);
        }else{
            User.items[index] = this;
        }
    }
    setID(id = null) {
        this.id = id === null ? User.calculateID() : id;
        this.id = isNaN(this.id) ? this.id.replace(/\s/,'') : this.id;
    }
    hashPassword(password){
        return crypto
            .createHmac('sha256', this.#__SECRET_KEY__)
            .update(password)
            .digest('hex') 
    }
    setPassword(password = null) {
        this.password = password !== null 
            ? this.hashPassword(password)
            : password;
    }
    checkPassword(password = null) {
        password = this.hashPassword(password);
        return this.password == password
    }
    setName(name = null) {
        this.name = name !== null ? name.replace(/\d/,'') : name;
    }
    setEmail(email = null) {
        this.email = email;
    }
    save(){
        this.#setToItems(element => element.id === this.id);
        return typeof User.findByID(this.id) === typeof User;
    }
    delete(){
        let index = User.getIndex(element => element.id === this.id);
        User.items.splice(index,1 )
        return typeof User.findByID(this.id) === typeof undefined;
    }
    
    *getProperties() {
        yield this.id;
        yield this.name;
        yield this.email;
        yield this.password;
    }
    getPropertiesArray(){
        return [...this.getProperties()]
    }
}
