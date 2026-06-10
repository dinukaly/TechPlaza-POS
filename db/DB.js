import { loadCollection, saveCollection } from "../assets/js/storageService.js";

const CUSTOMER_DB_KEY = "techplaza.customer_db";
const ITEM_DB_KEY = "techplaza.item_db";
const ORDER_DB_KEY = "techplaza.order_db";
const ORDER_DETAILS_DB_KEY = "techplaza.order_details_db";

const customerDefaults = [
  {
    id: "C001",
    name: "Customer 1",
    address: "123 Main St",
    contact: "1234567890",
    email: "customer1@example.com",
    phone: "1234567890",
  },
  {
    id: "C002",
    name: "Customer 2",
    address: "456 Oak St",
    contact: "0987654321",
    email: "customer2@example.com",
    phone: "0987654321",
  },
];

const itemDefaults = [
  {
    id: "I001",
    name: "Laptop",
    price: 1200.0,
    quantity: 100,
    description: "High performance laptop",
    image: "laptop.png",
  },
  {
    id: "I002",
    name: "Mouse",
    price: 25.0,
    quantity: 200,
    description: "Wireless mouse",
    image: "mouse.png",
  },
  {
    id: "I003",
    name: "Keyboard",
    price: 45.0,
    quantity: 150,
    description: "Mechanical keyboard",
    image: "keyboard.png",
  },
];

const orderDefaults = [];
const orderDetailsDefaults = [];

const customer_db = loadCollection(CUSTOMER_DB_KEY, customerDefaults);
const item_db = loadCollection(ITEM_DB_KEY, itemDefaults);
const order_db = loadCollection(ORDER_DB_KEY, orderDefaults);
const order_details_db = loadCollection(ORDER_DETAILS_DB_KEY, orderDetailsDefaults);

const persistDatabases = () => {
  saveCollection(CUSTOMER_DB_KEY, customer_db);
  saveCollection(ITEM_DB_KEY, item_db);
  saveCollection(ORDER_DB_KEY, order_db);
  saveCollection(ORDER_DETAILS_DB_KEY, order_details_db);
};

export { customer_db, item_db, order_db, order_details_db, persistDatabases };
