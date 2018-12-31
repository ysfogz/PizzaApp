class ExtraFactory{

    getItem(param) {
        switch (param) {
            case 'zeytin': return this.getZeytin();
            case 'sucuk': return this.getSucuk(); 
            case 'domates': return this.getDomates(); 
            case 'ton': return this.getTon(); 
            case 'mantar': return this.getMantar(); 
            case 'enginar': return this.getEnginar(); 
            default: break;
        }
    }
    getZeytin() {
        return new Extra("zeytin", 2);
    }

    getSucuk() {
        return new Extra("sucuk", 5);
    }

    getDomates() {
        return new Extra("domates", 3);
    }

    getTon() {
        return new Extra("ton", 4);
    }

    getMantar() {
        return new Extra("mantar", 1);
    }

    getEnginar() {
        return new Extra("enginar", 4);
    }
    
    getAll() {
        return [
            this.getDomates(),
            this.getEnginar(),
            this.getMantar(),
            this.getSucuk(),
            this.getTon(),
            this.getZeytin()
        ];
    }
}
