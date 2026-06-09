import { getAllCustomers } from "../../model/customerModel.js";
import { getAllItems } from "../../model/itemModel.js";
import { getAllOrders } from "../../model/orderModel.js";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value || 0);

const formatMonthLabel = (date = new Date()) =>
  date.toLocaleString("en-US", { month: "short", year: "numeric" }).toUpperCase();

const refreshDashboardMetrics = () => {
  const customers = getAllCustomers();
  const items = getAllItems();
  const orders = getAllOrders();

  const totalRevenue = orders.reduce(
    (sum, order) => sum + (Number(order.totalPrice) || 0),
    0
  );

  $("#dashboardPeriod").text(formatMonthLabel());
  $("#totalOrdersCount").text(orders.length.toLocaleString("en-US"));
  $("#totalCustomersCount").text(customers.length.toLocaleString("en-US"));
  $("#totalItemsCount").text(items.length.toLocaleString("en-US"));
  $("#totalRevenueCount").text(formatCurrency(totalRevenue));
  $("#dashboardRevenueSummary").text(`Total Revenue ${formatCurrency(totalRevenue)}`);
};

$(function () {
  refreshDashboardMetrics();
});

window.refreshDashboardMetrics = refreshDashboardMetrics;
