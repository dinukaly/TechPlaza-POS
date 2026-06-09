const orderSectionHTML = `
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="d-flex justify-content-end align-items-center mb-4">
          <i class="fa-solid fa-cart-shopping fa-xl me-3 text-purple"></i>
        </div>
        <hr class="text-secondary" />
        <div id="order_header_section">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="d-flex gap-2">
              <p>Order Details</p>
              <input
                type="text"
                class="form-control"
                id="searchOrder"
                placeholder="Search Orders..."
              />
            </div>
            <button id="btnPlaceOrder" class="btn btn-primary">+ Order</button>
          </div>
        </div>
      </div>
    </div>

    <div id="orderListContainer" style="display: block;">
      <div class="row">
        <div class="col">
          <div class="table-responsive">
            <table class="table table-hover align-middle">
              <thead class="table-light">
                <tr>
                  <th>Order ID</th>
                  <th>Order Date</th>
                  <th>Customer Name</th>
                  <th>Items</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody id="orderTableBody"></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div id="placeOrderContainer" style="display: none;">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h5 class="fw-bold text-purple"><i class="fa-solid fa-cart-plus me-2"></i>New Order</h5>
        <button id="btnBackToList" class="btn btn-outline-secondary">
          <i class="fa-solid fa-arrow-left me-1"></i> Back
        </button>
      </div>

      <div class="row g-3">
        <div class="col-md-3">
          <label class="form-label">Order ID</label>
          <input type="text" id="orderId" class="form-control" readonly>
        </div>
        <div class="col-md-3">
          <label class="form-label">Date</label>
          <input type="date" id="orderDate" class="form-control">
        </div>
        <div class="col-md-3">
          <label class="form-label">Customer ID</label>
          <select id="customerId" class="form-select">
            <option selected disabled>Choose...</option>
          </select>
        </div>
        <div class="col-md-3">
          <label class="form-label">Customer Name</label>
          <input type="text" id="customerName" class="form-control" readonly>
        </div>
      </div>

      <div class="row g-3 mt-4">
        <div class="col-md-4">
          <label class="form-label">Item Name</label>
          <select id="item_Name" class="form-select">
            <option selected disabled>Select Item</option>
          </select>
        </div>
        <div class="col-md-3">
          <label class="form-label">Unit Price</label>
          <input type="text" id="unitPrice" class="form-control" readonly>
        </div>
        <div class="col-md-3">
          <label class="form-label">Quantity</label>
          <input type="number" id="quantity" class="form-control">
        </div>
        <div class="col-md-2 d-flex align-items-end">
          <button id="btnAddToCart" class="btn btn-outline-primary w-100">Add to Cart</button>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col">
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead class="table-light">
                <tr>
                  <th>Item Name</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="cartTableBody"></tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="row mt-4 g-3">
        <div class="col-md-3">
          <label class="form-label">Total Cost</label>
          <input type="text" id="totalCost" class="form-control" readonly>
        </div>
        <div class="col-md-3">
          <label class="form-label">Paid Amount</label>
          <input type="number" id="paidAmount" class="form-control">
        </div>
        <div class="col-md-3">
          <label class="form-label">Balance</label>
          <input type="text" id="balance" class="form-control" readonly>
        </div>
        <div class="col-md-3 d-flex align-items-end">
          <button id="btnProceed" class="btn btn-success w-100">
            <span id="proceedBtnText">Proceed</span>
            <div id="proceedSpinner" class="spinner-border spinner-border-sm d-none" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
`;

$("#order_section").html(orderSectionHTML);
