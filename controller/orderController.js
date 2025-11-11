import {
  generateOrderId,
  addNewOrderRecord,
  updateOrderRecord,
  deleteOrderRecord,
  getOrderRecord,
  getAllOrders,
  searchOrderRecord,
} from "../model/orderModel.js";


//handle place order btn
$("#btnPlaceOrder").on("click", function () {
  $('#order_header_section').hide();
   $("#orderListContainer").hide();
   $("#placeOrderContainer").show();
   

});

