class OrderItem {
    constructor(type){
        this.orderItemId = this.getUniqId();
        this.count = 1; // for the first creation
        this.type = type;
    }

    getUniqId () {
        return new Date().getTime() - Math.floor(Math.random() * 1000);
    }

    setCount(number) { // To add one set number 1, to sub one set number -1
        this.count += number;
    }
    getCount() { 
        return this.count;
    }

    getType() {
        return this.type;
    }

    getCode() {
        return this.type.getCode();
    }

    getPrice() {
        //console.log("order Item", this.type.getPrice(), this.getCount())
        return this.type.getPrice() * this.getCount();
    }
}