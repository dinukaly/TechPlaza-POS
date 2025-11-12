import {
  generateOrderId,
  addNewOrderRecord,
  updateOrderRecord,
  deleteOrderRecord,
  getOrderRecord,
  getAllOrders,
  searchOrderRecord,
  addNewOrderDetailRecord,
  removeOrderDetailRecord,
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
  let quantity = parseInt($("#quantity").val());
  let unitPrice = parseFloat($("#unitPrice").val());
  let totalPrice = quantity * unitPrice;
  console.log(itemName, quantity, unitPrice, totalPrice);

  //get item id
  let itemId = items.find((i) => i.name === itemName).id;
  console.log("item id", itemId);

  //add order detail record
  addNewOrderDetailRecord(itemId, itemName, unitPrice, quantity);

  $("#cartTableBody").append(`
  <tr>
    <td style="display:none;">${itemId}</td> <!-- hidden item ID -->
    <td>${itemName}</td>
    <td>${unitPrice.toFixed(2)}</td>
    <td>${quantity}</td>
    <td>${totalPrice.toFixed(2)}</td>
    <td><i class="fa-solid fa-trash btnRemove text-danger" style="cursor: pointer;"></i></td>
  </tr>
`);

  //update total cost
  let currentTotal = parseFloat($("#totalCost").val()) || 0;
  currentTotal += totalPrice;
  $("#totalCost").val(currentTotal.toFixed(2));
});

$("#cartTableBody").on("click", ".btnRemove", function () {
  const row = $(this).closest("tr");
  const index = row.index();

  // get removed item's total before removing row
  const removedPrice = parseFloat(row.find("td:nth-child(5)").text().trim());

  // remove row from table
  row.remove();

  // update total cost
  let currentTotal = parseFloat($("#totalCost").val()) || 0;
  currentTotal -= removedPrice;
  $("#totalCost").val(currentTotal.toFixed(2));

  // remove from array using index
  removeOrderDetailRecord(index);
});

//proceed to payment
$("#btnProceed").on("click", function () {
  //get order id
  let orderId = $("#orderId").val();
  console.log("order id", orderId);
  let paidAmount = $("#paidAmount").val();
  let totalPayment = parseFloat($("#totalCost").val());
  console.log(totalPayment);

  console.log(paidAmount);
  //check if paid amount is valid
  if (paidAmount < totalPayment) {
    alert("Please enter a valid paid amount.");
    return;
  }
  calulateChange(paidAmount, totalPayment);

  setTimeout(() => {
    //hide place order container
    $("#placeOrderContainer").hide();
    //show order list container
    $("#orderListContainer").show();
  }, 1000);
});

function calulateChange(paidAmount, totalPayment) {
  //calculate change
  let change = paidAmount - totalPayment;
  console.log(change);
  //display change
  $("#balance").val(change.toFixed(2));
}

//getAllCustomers and getAll Items
let customers = getAllCustomers();
let items = getAllItems();
let currentItemId;
