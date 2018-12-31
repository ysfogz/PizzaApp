/**
 * 
 * pizza listesi 
 * bir liste elemanina tiklaninca yeni bir pizza olumasi lazim
 * extra larin eklenecegi liste lazim
 * sepete ekle
 * icecekler select add deyince sepete ekle
 * her ekleme yapildiginda basketin update edilmesi gerek
 * 
 * -- pizza listesi
 *     -- pizza extralar
 * -- icecek listesi
 * -- basket
 * 
 */

;
(function ($) {    
    
    var currentPizza = '';
    var currentBeverage = '';
    var currentOrder = '';
    var tableCount = 0;
    var totalPrice = 0;

    function init() {
        setPizzaList();
        setExstraList();
        setBeverageList();
        setSizeList();
    
        setPizzaListListener();
        setBeverageListListener();
        setAddButtonListener();
        setClearBasketListener();
        clearSelection();
    }

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
        $(".beverage-size-list").hide();
    }
    
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
        $(".beverage-size-list").hide();
    }
    
    function setPizzaListListener() {
        $(".lists-wrapper").hide();
        $(".pizza-list").click(() => {  
            // Clears selection in beverage menu
            if (currentBeverage) {
                $('input[name="bsize"]').prop('checked', false);
                $(".beverage-size-list").hide();
                currentBeverage = '';
            }
            // Set selection in pizza menu
            if (event.target.className === "pizza-item") {
                currentPizza = $(event.target).prop('id');
                $('input[name="e-item"]').prop('checked', false);
                $('input[name="psize"]').prop('checked', false);
                $(".lists-wrapper").hide();
                $(event.target).find(".lists-wrapper").show();
            }
        })
    }

    function setBeverageListListener() {
        $(".beverage-size-list").hide();
        $(".beverage-list").click(() => {
            // Clears selection in pizza menu
            if (currentPizza) {
                $('input[name="e-item"]').prop('checked', false);
                $('input[name="psize"]').prop('checked', false);
                $(".lists-wrapper").hide();
                currentPizza = '';
            }
            // Set selection in beverage menu
            if(event.target.className === "beverage-item") {
            currentBeverage = $(event.target).prop('id');
            $(".beverage-size-list").hide();
            $(event.target).find(".beverage-size-list").show();
            }
        });
    }


    function setAddButtonListener() {
        $("#button-add-basket").click(() => {
            if (currentPizza) {
                let pizzaSize = $(`#${currentPizza}`).find('input[name="psize"]:checked').val();
                if (!pizzaSize) {
                    alert('Please select a pizza size');
                    return;
                }
                let extraArray = $(`#${currentPizza}`).find('input[name="e-item"]:checked').map(function() {
                    return this.value;
                }).get();
                
                const extraFactory = new ExtraFactory();
                let extras = extraArray.map(item => {
                    return extraFactory.getItem(item);
                });
                let pizza = new Pizza(currentPizza, SIZE.properties[pizzaSize].name);
                pizza.addExtra(extras);
                orderItem = new OrderItem(pizza);
                addBasket(orderItem);
            }

            if (currentBeverage) {
                let beverageSize = $(`#${currentBeverage}`).find('input[name="bsize"]:checked').val();
                if (!beverageSize) {
                    alert('Please select a beverage size');
                    return;
                }
                let beverage = new Beverage(currentBeverage, SIZE.properties[beverageSize].name);
                orderItem = new OrderItem(beverage);
                addBasket(orderItem);
            }

        })
    }

    function setClearBasketListener() {
        $("#button-clear-basket").click(() => {
            clearSelection();
            $('.show-order').html('');
            $('#price').html('');
        });
    }

    function clearSelection() {
        currentPizza = '';
        $('input[name="e-item"]').prop('checked', false);
        $('input[name="psize"]').prop('checked', false);
        $(".lists-wrapper").hide();

        currentBeverage = '';
        $('input[name="bsize"]').prop('checked', false);
        $(".beverage-size-list").hide();

        currentOrder = '';
        tableCount = 0;
        totalPrice = 0;
    }

    function addBasket(orderItem) {
        let backColor='';
            if (tableCount %2 === 0) {
                backColor = '#ac9393';
            } else {
                backColor = '#95aee4';
            }
            totalPrice += orderItem.getType().getPrice();
            let htmlText =`<tr id=${tableCount} style="background-color:${backColor}">
                <th colspan="2" style="text-align:left">${orderItem.getType().getName()}</th>
                <th style="text-align:right">${orderItem.getType().getPrice()} chf</th>
                <th style="text-align:right"><button id="button-cancel"></button>
            </tr>
            <tr style="background-color:${backColor}"><td colspan="4">${orderItem.getType().getSize()} - 
            ${orderItem.getType() instanceof Pizza ? SIZE.properties[SIZE[orderItem.getType().getSize()]].pizza :
                SIZE.properties[SIZE[orderItem.getType().getSize()]].beverage}</td></tr>`;

            let extras = orderItem.getType() instanceof Pizza ? orderItem.getType().getExtra() : undefined;
            if (extras) {
                let innerText=`<tr style="background-color:${backColor}"><td colspan="4">`;
                extras.map(item => {
                    innerText +=`${item.getName()}, `;
                });
                innerText +=`</td></tr>`;
                htmlText += innerText;
            }
            tableCount++;
           
        $('.show-order').prepend(htmlText);
        $('#price').html(`${totalPrice} chf`);
    }

    function addOrder(orderItem) {
        if (!currentOrder) {
            currentOrder = new Order();
            currentOrder.addItem(orderItem);
        } else {
            // once itemslerin oldugu dizi olsun. en son order olustururuz. Pay butonu olsun 1 tane.
            currentOrder.addItem(orderItem);
        }
    }

    init();

})(jQuery);