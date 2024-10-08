const { default: mongoose } = require("mongoose");

const itemSchema = new mongoose.Schema({
  ItemName: {
    type: String,
    required: [true, "Please add a Item Name"],
    unique: [true, "Item Name already exists"],
  },
  size: {
    type: String,
    required: [true, "Please add a size"],
    unique: [true, "size already exists"],
  },
});
export const Item =
  mongoose.models.items || mongoose.model("items", itemSchema);
