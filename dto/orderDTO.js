class OrderDTO{
    constructor(orderId, orderDate, customerName, items, totalPrice){
        this._orderId=orderId;
        this._orderDate=orderDate;
        this._customerName = customerName,
        this._items = items,
        this._totalPrice = totalPrice
    }

    //getters
    get orderId(){
        return this._orderId;
    }
    get orderDate(){
        return this._orderDate;
    }
    get customerName(){
        return this._customerName;
    }
    get items(){
        return this._items;
    }
    get totalPrice(){
        return this._totalPrice;
    }

    //setters
    set orderId(orderId){
        this._orderId=orderId;
    }
    set orderDate(orderDate){
        this._orderDate=orderDate;
    }
    set customerName(customerName){
        this._customerName= customerName;
    }
    set items(items){
        this._items= items;
    }
    set totalPrice(totalPrice){
        this._totalPrice = totalPrice;
    }
}

export default OrderDTO;