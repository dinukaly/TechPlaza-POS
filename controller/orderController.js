import {
  generateOrderId,
  addNewOrderRecord,
  updateOrderRecord,
  deleteOrderRecord,
  getOrderRecord,
  getAllOrders,
  searchOrderRecord,
} from "../model/orderModel.js";

import { getAllCustomers } from "../model/customerModel.js";
import { getAllItems } from "../model/itemModel.js";

//handle place order btn
$("#btnPlaceOrder").on("click", function () {
  $("#order_header_section").hide();
  $("#orderListContainer").hide();
  $("#placeOrderContainer").show();

  populateOrderDropdowns();
});

//handle back to list btn
$("#btnBackToList").on("click", function () {
  $("#order_header_section").show();
  $("#placeOrderContainer").hide();
  $("#orderListContainer").show();
});

//populate dropdowns
const populateOrderDropdowns = () => {
  //populate customer dropdown
  const customers = getAllCustomers();
  $("#customerId")
    .empty()
    .append(`<option disabled selected>Choose...</option>`);
  customers.forEach((c) =>
    $("#customerId").append(`<option value="${c.id}">${c.id}</option>`)
  );
  console.log("log customers from cus dropdown", customers);
  customers.forEach((c) => console.log("Customer ID:", c.id));


  //populate item dropdown
  const items = getAllItems();
  $("#item_Name")
    .empty()
    .append(`<option disabled selected>Choose...</option>`);
  items.forEach((i) =>
    $("#item_Name").append(`<option value="${i.id}">${i.id}</option>`)
  );
  console.log("log items from item dropdown", items);
};
