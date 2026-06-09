const customerSectionHTML = `
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="d-flex justify-content-end align-items-center mb-4">
          <i class="fa-solid fa-user fa-xl me-3 text-purple"></i>
        </div>
        <hr class="text-secondary" />
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div class="d-flex gap-2">
            <p>Customer Details</p>
            <input
              type="text"
              class="form-control"
              id="searchCustomer"
              placeholder="Search Customers..."
            />
          </div>
          <button id="btnAddCustomer" class="btn btn-primary">+Customer</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Customer ID</th>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Contact</th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody id="customerTableBody"></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
`;

$("#customer_section").html(customerSectionHTML);
