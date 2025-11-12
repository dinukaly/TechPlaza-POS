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
  orderId = generateOrderId();
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
  customerId = $(this).val();
  const selectedCustomer = customers.find((c) => c.id === customerId);
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
  itemName = $("#item_Name").val();
  quantity = parseInt($("#quantity").val());
  unitPrice = parseFloat($("#unitPrice").val());
  totalPrice = quantity * unitPrice;
  console.log(itemName, quantity, unitPrice, totalPrice);

  //get item id
  let itemId = items.find((i) => i.name === itemName).id;
  console.log("item id", itemId);

  //add order detail record
  let orderDetail = {
    itemId,
    itemName,
    unitPrice,
    quantity,
    totalPrice,
  };
  cart.push(orderDetail);
  console.log("cart", cart);

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
  cart.splice(index, 1);
});

//proceed to payment
$("#btnProceed").on("click", function () {
  //get order id
  let orderId = $("#orderId").val();
  console.log("order id", orderId);
  let paidAmount = parseFloat($("#paidAmount").val());
  let totalPayment = parseFloat($("#totalCost").val());
  console.log(totalPayment);

  console.log(paidAmount);
  //check if paid amount is valid
  if (paidAmount < totalPayment) {
    alert("Please enter a valid paid amount.");
    return;
  }
  calulateChange(paidAmount, totalPayment);

  // Get order date and customer name from form
  orderDate = $("#orderDate").val();
  customerName = $("#customerName").val();
  
  // Add the order record with the cart data
  addNewOrderRecord(orderId, orderDate, customerName, cart, totalPayment);
  
  setTimeout(() => {
    //hide place order container
    $("#placeOrderContainer").hide();
    //show order list container
     $("#order_header_section").show();
    $("#orderListContainer").show();
  }, 1000);

  //load order details table
  loadOrderDetailsTable();
 
});

function calulateChange(paidAmount, totalPayment) {
  //calculate change
  let change = paidAmount - totalPayment;
  console.log(change);
  //display change
  $("#balance").val(change.toFixed(2));
}

//load order details table
function loadOrderDetailsTable() {
  //clear table
  $("#orderTableBody").empty();
  orders = getAllOrders();
  //populate table
  orders.forEach((d, index) => {
    let totalPrice = d.totalPrice || 0;
    
    $("#orderTableBody").append(`
    <tr data-order-index="${index}">
      <td>${d.orderId}</td>
      <td>${d.orderDate}</td>
      <td>${d.customerName}</td>
       <td><button class="btn btn-primary btnView">View</button></td>
      <td>${totalPrice.toFixed(2)}</td>
    </tr>
  `);
  });
}

//load customer purched items details in a modal
$(document).on('click', '.btnView',function () {
  // Get the order index from the data attribute
  const orderIndex = $(this).closest('tr').data('order-index');
  const orders = getAllOrders();
  const selectedOrder = orders[orderIndex];
  
  if (!selectedOrder) {
    console.error('Order not found at index:', orderIndex);
    return;
  }
  
  // Clear modal table
  $("#orderItemsTableBody").empty();
  
  // Get items from the order
  let purchasedItems = selectedOrder.items ;
  
  //populate modal table
  purchasedItems.forEach((item) => {
    $("#orderItemsTableBody").append(`
    <tr>
      <td>${item.itemName}</td>
      <td>${item.quantity}</td>
      <td>${(item.unitPrice|| 0).toFixed(2)}</td>
      <td>${(item.totalPrice ||0).toFixed(2)}</td>
    </tr>
  `);
  });
  
  //set modal title
  const customerName = selectedOrder.customerName || 'Unknown Customer';
  $("#orderModalTitle").text(`Items purchased by ${customerName}`);
  
  //show modal
  const orderDetailsModal = new bootstrap.Modal(document.getElementById('orderDetailsModal'));
  orderDetailsModal.show();
})

//variables
let orderId;
let orderDate;
let customerId;
let customerName;
let itemName;
let quantity;
let unitPrice;
let totalPrice;

//getAllCustomers and getAll Items
let customers = getAllCustomers();
let items = getAllItems();
let currentItemId;

let cart = [];
let tbl_row = -1;
let orders;