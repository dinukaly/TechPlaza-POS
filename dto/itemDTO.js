class ItemDTO{

    constructor(id,name,price,quantity,description,image){
        this._id=id;
        this._name=name;
        this._price=price;
        this._quantity=quantity;
        this._description=description;
        this._image=image;
    }

    //getters
    get id(){
        return this._id;
    }
    get name(){
        return this._name;
    }
    get price(){
        return this._price;
    }
    get quantity(){
        return this._quantity;
    }
    get description(){
        return this._description;
    }
    get image(){
        return this._image;
    }

    //setters
    set id(id){
        this._id=id;
    }    
    set name(name){
        this._name=name;
    }
    set price(price){
        this._price=price;
    }
    set quantity(quantity){
        this._quantity=quantity;
    }
    set description(description){
        this._description=description;
    }
    set image(image){
        this._image=image;
    }
}

export default ItemDTO;