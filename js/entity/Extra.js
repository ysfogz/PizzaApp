
/**
 * Extas for pizza order
 */

class Extra {
    constructor(name, price){
        this.name = name;
        this.price = price;
        this.extraId = this.getUniqId();
    }

    getName(){
        return this.name;
    }

    getUniqId () {
        return new Date().getTime() - Math.floor(Math.random() * 1000);
    }

    getPrice(){
        return this.price;
    }

    getId(){
        return this.extraId;
    }

    // to utilize OrderItem content to seperate extra order items
    getCode() {
        return this.name.slice(0,1);
    }
}