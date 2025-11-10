class CustomerDTO{
    constructor(id,name,address,contact,email){
        this._id=id;
        this._name=name;
        this._address =address;
        this._contact=contact;
        this._email=email;
    }

    
    //getters
    get id(){
        return this._id;
    }
    get name(){
        return this._name;
    }   
   get address(){
        return this._address;
    }
    get contact(){
        return this._contact;
    }
    get email(){
        return this._email;
    }

    //setters
    set id(id){
        this._id=id;
    }
    set name(name){
        this._name=name;
    }
    set address(address){
        this._address=address;
    }
    set contact(contact){
        this._contact=contact;
    }
    set email(email){
        this._email=email;
    }
}

export default CustomerDTO;