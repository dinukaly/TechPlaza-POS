import ItemDTO from "../dto/itemDTO.js";
import { item_db, persistDatabases } from "../db/DB.js";
import { generateNextId } from "../assets/js/storageService.js";

//generate item ID
function generateItemId() {
  return generateNextId(item_db, "id", "I");
}

//add item
const addNewItemRecord = (item_id, name, price, quantity, description, image) => {
  let item = new ItemDTO(item_id, name, price, quantity, description, image);

  item_db.push(item);
  persistDatabases();
};

//update item
const updateItemRecord = (
  item_id,
  name,
  price,
  quantity,
  description,
  image,
  tbl_row
) => {
  let item = new ItemDTO(item_id, name, price, quantity, description, image);
  item_db[tbl_row] = item;
  persistDatabases();
  return true;
};

//delete item
const deleteItemRecord = (index) => {
  item_db.splice(index, 1);
  persistDatabases();
};

//get item
const getItemRecord = (index) => {
  return item_db[index];
};

//get all items
const getAllItems = () => {
  return item_db;
};

//search items
const searchItemRecord = (searchText) => {
  return item_db.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );
};

const decreaseItemQuantity = (itemId, quantityToSubtract) => {
  const item = item_db.find((record) => record.id === itemId);

  if (!item) {
    return false;
  }

  const nextQuantity = Number(item.quantity || 0) - Number(quantityToSubtract || 0);
  item.quantity = nextQuantity < 0 ? 0 : nextQuantity;
  persistDatabases();
  return true;
};

export {
  generateItemId,
  addNewItemRecord,
  updateItemRecord,
  deleteItemRecord,
  getItemRecord,
  getAllItems,
  searchItemRecord,
  decreaseItemQuantity,
};
