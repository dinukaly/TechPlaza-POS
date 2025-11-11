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
  //generate order id
  const orderId = generateOrderId();
  $("#orderId").val(orderId);

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
  $("#customerId")
    .empty()
    .append(`<option disabled selected>Choose...</option>`);
  customers.forEach((c) =>
    $("#customerId").append(`<option value="${c.id}">${c.id}</option>`)
  );
  console.log("log customers from cus dropdown", customers);
  customers.forEach((c) => console.log("Customer ID:", c.id));

  //populate item dropdown
  $("#item_Name")
    .empty()
    .append(`<option disabled selected>Choose...</option>`);
  items.forEach((i) =>
    $("#item_Name").append(`<option value="${i.name}">${i.name}</option>`)
  );
  console.log("log items from item dropdown", items);
};

//auto fill customer name
$("#customerId").on("change", function () {
  const selectedId = $(this).val();
  const selectedCustomer = customers.find((c) => c.id === selectedId);
  if (selectedCustomer) {
    $("#customerName").val(selectedCustomer.name);
  }
});

//auto fill item details
$("#item_Name").on("change", function () {
  const selectedId = $(this).val();
  const selectedItem = items.find((i) => i.name === selectedId);
  if (selectedItem) {
    $("#unitPrice").val(selectedItem.price);
    currentItemId = selectedItem.id;
  }
});

$("#quantity").on("keyup change", function () {
  const selectedItem = items.find((i) => i.id === currentItemId);
  const availableQty = selectedItem ? selectedItem.quantity : 0;
  const enteredQty = parseInt($(this).val()) || 0;

  if (enteredQty > availableQty) {
    alert("Insufficient stock available.");
    $(this).val("");
  }
});

//add to cart
$("#btnAddToCart").on("click", function () {
  let itemName = $("#item_Name").val();
  let quantity = parseInt($("#itemQuantity").val());
  let unitPrice = parseFloat($("#unitPrice").val());
  let totalPrice = quantity * unitPrice;
  console.log(itemName, quantity, unitPrice, totalPrice);

  //append to cart table
  $("#cartTableBody").append(`
    <tr>
      <td>${itemName}</td>
      <td>${quantity}</td>
      <td>${unitPrice.toFixed(2)}</td>
      <td>${totalPrice.toFixed(2)}</td>
    </tr>
  `);
});

//getAllCustomers and getAll Items
let customers = getAllCustomers();
let items = getAllItems();
let currentItemId;