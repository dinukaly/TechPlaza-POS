let customer_db = [];
let item_db = [];
let order_db = [];
let order_details_db = [];


//pre-populate customer database
customer_db.push(
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
);

//pre-populate item database
item_db.push(
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
);
//pre-populate order database
// order_db.push(
//   {
//     orderId: "O001",
//     orderDate: "2023-09-01",
//     customerName: "Customer 1",
//     itemName: "Laptop",
//     quantity: 1,
//     totalPrice: 1200.0,
//   },
//   {
//     orderId: "O002",
//     orderDate: "2023-09-02",
//     customerName: "Customer 2",
//     itemName: "Mouse",
//     quantity: 2,
//     totalPrice: 50.0,
//   },
// );
export { customer_db, item_db, order_db, order_details_db };