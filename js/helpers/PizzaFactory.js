class PizzaFactory {
    getMargaritha() {
        return new Pizza(PIZZAKIND.Margarita, SIZE.Small);
    }

    getGorgonzola() {
        return new Pizza(PIZZAKIND.Gorgonzola, SIZE.Small);
    }

    getProschutto() {
        return new Pizza(PIZZAKIND.Proschutto, SIZE.Small);
    }

    getFungi() {
        return new Pizza(PIZZAKIND.Fungi, SIZE.Small);
    }

    getAll () {
        return [
            this.getFungi(),
            this.getGorgonzola(),
            this.getMargaritha(),
            this.getProschutto()
        ];
    }
}