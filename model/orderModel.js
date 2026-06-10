import OrderDTO from "../dto/orderDTO.js";
import { order_db, order_details_db, persistDatabases } from "../db/DB.js";
import { generateNextId } from "../assets/js/storageService.js";



//generate order ID
function generateOrderId() {
  return generateNextId(order_db, "orderId", "O");
}

//add order
const addNewOrderRecord = (order_id, order_date, customer_name, items, total_price) => {
  let order = new OrderDTO(order_id, order_date, customer_name, items, total_price);

  order_db.push(order);
  persistDatabases();
};

//update order
const updateOrderRecord = (
  order_id,
  order_date,
  customer_name,
  items,
  total_price,
  tbl_row
) => {
  let order = new OrderDTO(order_id, order_date, customer_name, items, total_price);
  order_db[tbl_row] = order;
  persistDatabases();
  return true;
};

//delete order
const deleteOrderRecord = (index) => {
  order_db.splice(index, 1);
  persistDatabases();
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
