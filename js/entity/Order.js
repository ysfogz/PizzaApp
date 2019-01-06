class Order {
    constructor(){
        this.date = new Date();
        this.orderItems = [];
        this.orderId = this.getUniqId();
        this.status = 'Unordered';
    }

    // Sets status of order. In this application, it is considered just "Unordered" and "Ordered!"
    setStatus(value) {
        this.status = value;
    }

    // Gets status of order. In this application, it is considered just "Unordered" and "Ordered!"
    getStatus() {
        return this.status;
    }

    // Adds orderItem. If an orderItem already exist so, increase the quantitiy of the order
    addItems(item){
        let index = this.orderItems.findIndex(e => e.getCode() == item.getCode());
        if (index > -1) {
            this.orderItems[index].setCount(1);
        } else {
            this.orderItems.push(item);
        }
    }

    // Gets order items in an order. 
    getItems() {
        return this.orderItems;
    }

    // Deletes orderItem. If an orderItem has more then one so, decrease the quantity of the order
    deleteItems(index) {
        if (this.orderItems[index].getCount() > 1) {
            this.orderItems[index].setCount(-1);
        } else {
          this.orderItems.splice(index,1);  
        }
    }

    getUniqId () {
        return new Date().getTime() - Math.floor(Math.random() * 1000);
    }

    // Gets total price of an order
    getPrice() {
        return this.orderItems.reduce((sum, curr)=> {
            sum += curr.getPrice();
            return sum;
        }, 0);
    }

}