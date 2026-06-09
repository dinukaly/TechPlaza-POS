const itemSectionHTML = `
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="d-flex justify-content-end align-items-center mb-4">
          <i class="fa-solid fa-box fa-xl me-3 text-purple"></i>
        </div>
        <hr class="text-secondary" />
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div class="d-flex gap-2">
            <p>Item Details</p>
            <input
              type="text"
              class="form-control"
              id="searchItem"
              placeholder="Search Items..."
            />
          </div>
          <button id="btnAddItem" class="btn btn-primary">+Item</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Item ID</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Description</th>
                <th scope="col">Image</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody id="itemTableBody"></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
`;

$("#item_section").html(itemSectionHTML);
