class Beverage {
    constructor(name, size){
        this.name = name;
        this.size = size;
        this.price = 0;
        this.beverageId = this.getUniqId();
    }

    getSize() {
        return this.size;
    }
    
    getName(){
        return this.name;
    }

    getUniqId () {
        return new Date().getTime() - Math.floor(Math.random() * 1000);
    }

    getPrice(){
        return BEVERAGEKIND.properties[BEVERAGEKIND[this.name]][this.size];
    }

    getId(){
        return this.beverageId;
    }

    // for OrderItem content
    getCode() {
        return this.name.slice(0,1) + this.size.slice(0,1);
    }
}