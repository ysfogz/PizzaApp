// EXTRAS

const zeytin = new Extra("zeytin", 2);
const sucuk = new Extra("sucuk", 5);
const domates = new Extra("domates", 3);
const mantar = new Extra("zeytin", 1);
const ton = new Extra("ton", 4);
const enginar = new Extra("enginar", 4);

// PIZZAS
const margarita = new Pizza("margarita", 16, SIZE.Small);
const gorgonzola = new Pizza("gorgonzola", 19, SIZE.Medium);
const proschutto = new Pizza("proschutto", 21, SIZE.Large);
const fungi = new Pizza("fungi", 17, SIZE.Small);

// BEVERAGES
let beverageHelper = new BeverageFactory();

const cola = beverageHelper.getCola();
const fanta = new Beverage("Fanta", 4);
const rivella = new Beverage("Rivalle", 4);
const ayran = new Beverage("Ayran", 4);
/*
// Rabia hanim 
const rabiaHanim = new OrderItem(fungi);
rabiaHanim.getType().addExtra(enginar);
// Taner bey
const tanerBey = new OrderItem(margarita);
// Cemil bey
const cemilBeyPizza = new OrderItem(gorgonzola);
cemilBeyPizza.getType().addExtra(sucuk);
const cemilBeyBeverage = new OrderItem(fanta);


let siparis = new Order();
siparis.addItems(rabiaHanim);
siparis.addItems(tanerBey);
siparis.addItems(cemilBeyPizza);
siparis.addItems(cemilBeyBeverage);
*/
