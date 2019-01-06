


/**
 * Initializer js file for design view
 * This consructs pizza list view, beverage view and their 
 * sub attribute views of such SIZE for both and EXTRAS for
 * just pizza 
 */


 /**
  * Sets pizza list view
  */


    function setPizzaList() {
        const pizzas = new PizzaFactory();
        let all = pizzas.getAll();
        all = all.map(item => {
            return `<li id="${PIZZAKIND.properties[item.getName()].name}" class="pizza-item">
                        ${PIZZAKIND.properties[item.getName()].name} 
                        <div class="lists-wrapper">
                            <ul class="pizza-size-list">Sizes</ul>
                            <ul class="exstra-list">Extras</ul>            
                        </div>
                    </li>`;
        });
        $(".pizza-list").append(all.join("").toString());
    }


    /**
     * Sets Beverage list view
     */
    function setBeverageList() {
        const beverages = new BeverageFactory();
        let all = beverages.getAll();
        all = all.map(item => {
            return `<li id="${item.getName()}" class="beverage-item">
                        ${item.getName()} 
                        <ul class ="beverage-size-list"></ul>
                    </li>`;
        });
        $(".beverage-list").append(all.join("").toString());
    }
    

    /**
     * Sets extra list items for pizza additions
     */
    function setExstraList() {
        const extras = new ExtraFactory();
        let all = extras.getAll();
        all = all.map(item => {
            return `<li id="${item.getName()}" class="extra-item">
                        <input class="extra-item" type="checkbox" name="e-item" value="${item.getName()}">
                        ${item.getName()} </input> 
                    </li>`;
        });
        $(".exstra-list").append(all.join("").toString()); 
    }


    /**
     * Sets size list for both pizza and beverage. It constructs special SIZE items for every aspect.
     * It contains small, medium, etc... for pizzas and mililitres for beverages. 
     */
    function setSizeList() {
        let allPizza = [];
        let allBeverage = []; 
    
        for (let index = 0; index < Object.keys(SIZE).length-1; index++) { 
            allPizza.push(`<li class="size-item"> 
                            <input class="size-item" type="radio" name="psize" value="${index}">
                            ${Object.keys(SIZE)[index]} - ${SIZE.properties[index].pizza}</input>
                        </li>`);
    
            allBeverage.push(`<li class="size-item"> 
                                <input class="size-item" type="radio" name="bsize" value="${index}">
            ${Object.keys(SIZE)[index]} - ${SIZE.properties[index].beverage}</input>
                         </li>`);
            
        }
    
        $(".pizza-size-list").append(allPizza.join(''));
        $(".beverage-size-list").append(allBeverage.join(''));
    }
    