class Pizza{
    constructor(
        name,
        size
    ){
        this.pizzaId = this.getUniqId();
        this.name = name;
        this.price = 0;
        this.size = size;
        this.extras = [];
    }

    addExtra(item){
        if (Array.isArray(item)) {
            item.map(e => {
                this.extras.push(e);
            });
        } else {
          this.extras.push(item);  
        }
        
    }

    getExtra(){
        return this.extras;
    }

    getExtraPrice(){
        return this.extras.reduce((sum, curr) => {
            sum += curr.getPrice();
            return sum;
        }, 0);
    }

    getUniqId () {
        return new Date().getTime() - Math.floor(Math.random() * 1000);
    }

    // To get price according to pizza kind and its size. Then adds extas' prices
    getPrice(){
        return PIZZAKIND.properties[PIZZAKIND[this.name]][this.size] + this.getExtraPrice();
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.pizzaId;
    }

    getSize() {
        return this.size;
    }

    // for OrderItem content
    getCode() {
        let extraCode = this.extras.reduce((sum, curr) => {
            sum += curr.getCode();
            return sum;
        }, '');

        return this.name.slice(0,1) + this.size.slice(0,1) + extraCode; 
    }

}

