import { OrderDTO } from "../dto/orderDTO.js";
import { order_db } from "../db/DB.js";


//generate order ID
function generateOrderId() {
  if (order_db.length === 0) return "O001";

  // Get last order ID
  const lastId = order_db[order_db.length - 1].orderId;

  // Extract the numeric part and increment
  const num = parseInt(lastId.substring(1)) + 1;

  // Pad with zeros (1 -> 001, 12 -> 012)
  return "O" + num.toString().padStart(3, "0");
}

//add order
const addNewOrderRecord = (order_id, order_date, customer_name, item_name, quantity, total_price) => {
  console.log(order_id, order_date, customer_name, item_name, quantity, total_price);

  let order = new OrderDTO(order_id, order_date, customer_name, item_name, quantity, total_price);
  console.log(order);

  order_db.push(order);
};

//update order
const updateOrderRecord = (
  order_id,
  order_date,
  customer_name,
  item_name,
  quantity,
  description,
  image,
  tbl_row
) => {
  let item = new ItemDTO(item_id, name, price, quantity, description, image);
  let order = new OrderDTO(order_id, order_date, customer_name, item_name, quantity, total_price);
  order_db[tbl_row] = order;
    return true;
};

//delete order
const deleteOrderRecord = (index) => {
  order_db.splice(index, 1);
};

//get order
const getOrderRecord = (index) => {
  return order_db[index];
};

//get all orders
const getAllOrders = () => {
  return order_db;
};

//search orders
const searchOrderRecord = (searchText) => {
  return order_db.filter((order) =>
    order.customerName.toLowerCase().includes(searchText.toLowerCase())
  );
};

export {
  generateOrderId,
  addNewOrderRecord,
  updateOrderRecord,
  deleteOrderRecord,
  getOrderRecord,
  getAllOrders,
  searchOrderRecord,
};
