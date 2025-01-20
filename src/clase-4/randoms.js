export default class Randomizer{
    #max = 1;
    #amount = 10000;
    setMax(amount){
        this.#max = amount;
        return this;
    }
    setAmount(amount){
        this.#amount = amount;
        return this;
    }
    generate(){
        let result = [];
        for(let z = 0 ; z < this.#amount; z++){
            let random = Math.ceil(Math.random()*this.#max);
            if(!result.find(random)){
                result.push(random);
            }else{
                
            }
            
        }
        return result;
    }
}
console.log((new Randomizer()).setAmount(10000).setMax(20).generate());