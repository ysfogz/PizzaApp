class Order {
    constructor(){
        this.date = new Date();
        this.orderItems = [];
        this.orderId = this.getUniqId();
    }

    // If an orderItem already exist so, increase the quantitiy of the order
    addItems(item){
        let index = this.orderItems.findIndex(e => e.getCode() == item.getCode());
        if (index > -1) {
            this.orderItems[index].setCount(1);
        } else {
            this.orderItems.push(item);
        }
    }

    getItems() {
        return this.orderItems;
    }

    getUniqId () {
        return new Date().getTime() - Math.floor(Math.random() * 1000);
    }

    getPrice() {
        return this.orderItems.reduce((sum, curr)=> {
            sum += curr.getPrice();
            return sum;
        }, 0);
    }

}