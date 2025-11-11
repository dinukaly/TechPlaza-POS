class OrderDTO{
    constructor(orderId, orderDate, customerName, itemName,quantity, totalPrice){
        this._orderId=orderId;
        this._orderDate=orderDate;
        this._customerName = customerName,
        this._itemName = itemName,
        this._quantity = quantity,
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
    get itemName(){
        return this._itemName;
    }
    get quantity(){
        return this._quantity;
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
        this._customerName=customerName;
    }
    set itemName(itemName){
        this._itemName=itemName;
    }
    set quantity(quantity){
        this._quantity=quantity;
    }
    set totalPrice(totalPrice){
        this._totalPrice=totalPrice;
    }
}