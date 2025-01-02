class User {
    id = null;
    name = null;
    email = null;
    static items = [];
    static table = 'users';
    static getIndex(callback){
        return User.items.findIndex(callback);
    }
    static findByID(id){
        let index = User.getIndex(element => element.id == id);
        return index < 0 ? null : User.items[index];
    }
    static calculateID(){
        return User.items.length + 1;
    }
    constructor(id = null, name = null, email = null) {
        this.setID(id);
        this.setName(name);
        this.setEmail(email);
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
    }
    getPropertiesArray(){
        return [...this.getProperties()]
    }
}

const student1 = new User();
student1.setEmail('zamorluz@gmail.com');
console.log([...student1.getProperties()]);
student1.save();

const student2 = new User();
student2.setEmail('zamorluz2@gmail.com');
student2.setName('Luz');
console.log(student2.getPropertiesArray());
student2.save();

const student3 = new User(2);
student3.setEmail('zamorluz3@gmail.com');
student3.setName('Luz Santander');
console.log([...student3.getProperties()]);


console.log(User.items);
student2.delete()
console.log(User.items);

console.log(User.findByID(2))
console.log(User.findByID(1))