


/**
 * Sets the eventlisteners of items on the view.
 * Current and only entry point into Jquery.
 */


(function ($) {    
    
    var currentPizza = undefined;
    var currentBeverage = undefined;
    var currentOrder = undefined;  

    function init() {
        setPizzaList();
        setExstraList();
        setBeverageList();
        setSizeList();
        setPriceList();

        setPizzaListListener();
        setBeverageListListener();
        setAddButtonListener();
        setClearBasketListener();
        setCancelOrderItemListener()
        clearSelection();
    }

    /**
     * Pizza item's event listener. Clicking any pizza on the view, shows
     * size and extra menus for clicked pizza inorder to select one size and
     * a number of extras.
     */
    function setPizzaListListener() {
        $(".lists-wrapper").hide();
        $(".pizza-list").click(() => {  
            // Clears selection in beverage menu
            if (currentBeverage) {
                $('input[name="bsize"]').prop('checked', false);
                $(".beverage-size-list").hide();
                currentBeverage = undefined;
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

    /**
     * Beverage's event listener. Clicking any beverage on the view, shows
     * size for clicked beverage inorder to select one size.
     */
    function setBeverageListListener() {
        $(".beverage-size-list").hide();
        $(".beverage-list").click(() => {
            // Clears selection in pizza menu
            if (currentPizza) {
                $('input[name="e-item"]').prop('checked', false);
                $('input[name="psize"]').prop('checked', false);
                $(".lists-wrapper").hide();
                currentPizza = undefined;
            }
            // Set selection in beverage menu
            if(event.target.className === "beverage-item") {
            currentBeverage = $(event.target).prop('id');
            $(".beverage-size-list").hide();
            $(event.target).find(".beverage-size-list").show();
            }
        });
    }


    /**
     * Finds selected pizza or beverage item and its selected extra and size items. 
     * Having clicked it controls first if there is any order and the order is just finished. 
     * This because to avoid any transaction during PAY animation time after PAY button is just clicked. 
     * This animation takes 6700ms. Otherwise just quits function with a "return"; 
     * 
     * Then checks if the order is a pizza or beverage since processes are changes regarding the item
     * 
     * Finally calls "addOrder" function to add selected item to the basket.
     */
    function setAddButtonListener() {
        $("#button-add-basket").click(() => {
            if (currentOrder && currentOrder.getStatus() === 'Ordered!') {
                return;
            }
            if (currentPizza) {
                let pizzaSize = $(`#${currentPizza}`).find('input[name="psize"]:checked').val();
                if (!pizzaSize) {
                    alert('Please select a pizza size');
                    return;
                }
                let extraArray = $(`#${currentPizza}`).find('input[name="e-item"]:checked').map(function() {
                    return this.value;
                }).get(); // get function makes an array from "map's" returned array-like object.  
                
                const extraFactory = new ExtraFactory();
                let extras = extraArray.map(item => {
                    return extraFactory.getItem(item);
                });
                let pizza = new Pizza(currentPizza, SIZE.properties[pizzaSize].name);
                pizza.addExtra(extras);
                let orderItem = new OrderItem(pizza);
                addOrder(orderItem);
                console.log(extraArray);
            }

            if (currentBeverage) {
                let beverageSize = $(`#${currentBeverage}`).find('input[name="bsize"]:checked').val();
                if (!beverageSize) {
                    alert('Please select a beverage size');
                    return;
                }
                let beverage = new Beverage(currentBeverage, SIZE.properties[beverageSize].name);
                let orderItem = new OrderItem(beverage);
                addOrder(orderItem);
            }

        })
    }

    /**
     * Clears the basket and calls "clearSelection" function for unselecting extra and size
     * radio- and checkboxes then re-initializing global variables.
     * 
     * Having clicked it controls first if there is any order and the order is just finished. 
     * This because to avoid any transaction during PAY animation time after PAY button is just clicked. 
     * This animation takes 6700ms. Otherwise just quits function with a "return"; 
     */
    function setClearBasketListener() {
        $("#button-clear-basket").click(() => {
            if (currentOrder && currentOrder.getStatus() === 'Ordered!') {
                return;
            }
            clearSelection();
            $('.show-order').html('');
            $('#price').html('0 chf');
        });
    }

    /**
     * Helper function for cleaning the basket and initializig current- Pizza, Beverage and 
     * Order variables. Besides, this function clears all selections on extra and size lists of 
     * pizza and beverage items.
     */
    function clearSelection() {
        currentPizza = undefined;
        $('input[name="e-item"]').prop('checked', false);
        $('input[name="psize"]').prop('checked', false);
        $(".lists-wrapper").hide();

        currentBeverage = undefined;
        $('input[name="bsize"]').prop('checked', false);
        $(".beverage-size-list").hide();

        currentOrder = undefined;

    }

    /**
     * 
     * @param {*} orderArray 
     * Takes an array parameter to get "order items" and creates basket list view in a <table> element. Every time 
     * it is called, re-create the view according to the parameter. The view shows ordered items and total price.
     * 
     * This function is not in the init file contary to create a view. Because it uses currentOrder global variable and
     * it is not related first initializing of the web page rather related to dynamic view desing during application work.
     */
    function addBasket(orderArray) {
        
        $('.show-order').html('');

        orderArray.map((orderItem, index) => {
            let backColor = index % 2 === 0 ? '#ac9393' : '#95aee4';
            let name = orderItem.getType().getName();
            let quantity = orderItem.getCount();
            let price = orderItem.getType().getPrice() * quantity;
            let size = orderItem.getType().getSize();
            let gross = orderItem.getType() instanceof Pizza ? SIZE.properties[SIZE[orderItem.getType().getSize()]].pizza :
            SIZE.properties[SIZE[orderItem.getType().getSize()]].beverage;

            let htmlText =`<tr id=${index} style="background-color:${backColor}">
                <th colspan="2" style="text-align:left">${name} <span>${quantity > 1 ? "(x "+quantity.toString()+")" :""}</span></th>
                <th style="text-align:right">${price} chf</th>
                <th style="text-align:right"><button id=${index} class="button-cancel"></button>
            </tr>
            <tr style="background-color:${backColor}"><td colspan="4">${size} - ${gross}</td></tr>`;

            let extras = orderItem.getType() instanceof Pizza ? orderItem.getType().getExtra() : undefined;
            if (extras) {
                let innerText=`<tr style="background-color:${backColor}"><td colspan="4">`;
                extras.map((item, ind, arr) => {     
                    innerText += arr.length -1 === ind ? `${item.getName()}` : `${item.getName()}, `;
                });
                innerText +=`</td></tr>`;
                htmlText += innerText;
            }
            $('.show-order').prepend(htmlText);
        });

        let totalPrice =  currentOrder.getPrice(); 
        $('#price').html(`${totalPrice} chf`);
    }

    /**
     * 
     * @param {*} orderItem 
     * Takes a parameter to get a single order item. Firstly, it checks whether currentOrder item exis. If not 
     * creates one and adds order item to the currentOrder. Then calls "addBasket" function to add order item 
     * to the basket and basket view.
     */
    function addOrder(orderItem) {
        if (!currentOrder) {
            currentOrder = new Order();
            currentOrder.addItems(orderItem);
            currentOrder.status = 'Ordering';
        } else {
            // once itemslerin oldugu dizi olsun. en son order olustururuz. Pay butonu olsun 1 tane.
            currentOrder.addItems(orderItem);
        }

        addBasket(currentOrder.getItems());
    }

    /**
     * When clicking X button on the right of the each order in the basket list, this function deletes
     * that order in the list or decrease its quantitiy of order calling "deleteItems" method of "Order" class.
     * Then calls "addBasket" function to re-desing basket list view.
     */
    function setCancelOrderItemListener() {
        $(".show-order").click('.button-cancel', function() {
            let index = $(event.target).prop('id'); 
            currentOrder.deleteItems(index);
            addBasket(currentOrder.getItems());
        });
    }

    /**
     * This function realises payment and finishes order process showing an animation on the basket list view.
     * This function is written directly not wrapped in a function. This is for diversifying of writing pattern. 
     */
    $('#button-pay').click(function() {
        if (!currentOrder) {
            return;
        }
        currentOrder.setStatus('Ordered!');

        // animate content
        $('.show-order').addClass('animate_content');
        $('#price').delay(500).fadeOut('slow');
        setTimeout(function() {            
            $('.show-order').html(`<th style="text-align:center">${$('.anime').html()}</th>`);
            }, 1700);

        setTimeout(function() {
            clearSelection();
            $('#price').html('').fadeIn();
            $('.show-order').html('').fadeIn();
            $('.show-order').removeClass('animate_content');
        }, 5000);
        
        });

    init();

    
})(jQuery);