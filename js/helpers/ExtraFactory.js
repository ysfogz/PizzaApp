class ExtraFactory{

    getItem(param) {
        switch (param) {
            case 'olive': return this.getOlive();
            case 'sausage': return this.getSausage(); 
            case 'tomato': return this.getTomato(); 
            case 'fish': return this.getFish(); 
            case 'mushroom': return this.getMushroom(); 
            case 'artichoke': return this.getArtichoke(); 
            default: break;
        }
    }
    getOlive() {
        return new Extra("olive", 2);
    }

    getSausage() {
        return new Extra("sausage", 5);
    }

    getTomato() {
        return new Extra("tomato", 3);
    }

    getFish() {
        return new Extra("fish", 4);
    }

    getMushroom() {
        return new Extra("mushroom", 1);
    }

    getArtichoke() {
        return new Extra("artichoke", 4);
    }
    
    getAll() {
        return [
            this.getTomato(),
            this.getArtichoke(),
            this.getMushroom(),
            this.getSausage(),
            this.getFish(),
            this.getOlive()
        ];
    }
}
