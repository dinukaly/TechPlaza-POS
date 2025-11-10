import ItemDTO from "../dto/itemDTO.js";
import { item_db } from "../db/DB.js";

//generate item ID
function generateItemId() {
  if (item_db.length === 0) return "I001";

  // Get last item ID
  const lastId = item_db[item_db.length - 1].id;

  // Extract the numeric part and increment
  const num = parseInt(lastId.substring(1)) + 1;

  // Pad with zeros (1 -> 001, 12 -> 012)
  return "I" + num.toString().padStart(3, "0");
}

//add item
const addNewItemRecord = (item_id, name, price, quantity, description, image) => {
  console.log(item_id, name, price, quantity, description, image);

  let item = new ItemDTO(item_id, name, price, quantity, description, image);
  console.log(item);

  item_db.push(item);
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
  return true;
};

//delete item
const deleteItemRecord = (index) => {
  item_db.splice(index, 1);
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

export {
  generateItemId,
  addNewItemRecord,
  updateItemRecord,
  deleteItemRecord,
  getItemRecord,
  getAllItems,
  searchItemRecord,
};
