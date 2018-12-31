class BeverageFactory {

    getItem(param) {
        switch (param) {
            case 'Cola': return this.getCola();
            case 'Fanta': return this.getFanta(); 
            case 'Rivella': return this.getRivella(); 
            case 'Ayran': return this.getAyran();            
            default: break;
        }
    }

    getCola() {
        return new Beverage("Cola", SIZE.Small);
    }

    getFanta() {
        return new Beverage("Fanta", SIZE.Small);
    }

    getRivella() {
        return new Beverage("Rivella", SIZE.Small);
    }

    getAyran() {
        return new Beverage("Ayran", SIZE.Small);
    }

    getAll() {
        return [
            this.getCola(),
            this.getFanta(),
            this.getRivella(),
            this.getAyran()
        ];
    }
}