import { connectDB } from "@/helper/db";
import { Item } from "@/models/listModel";
import { NextResponse } from "next/server";

connectDB();

// for Getting Single Item
export const GET = async (request, { params }) => {
  var { itemId } = params;
  try {
    const item = await Item.findOne({ _id: itemId });
    if (!item)
      return NextResponse.json(
        { error: "item not found", success: false },
        { status: 404 }
      );
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "error in getting List", success: false },
      { status: 500 }
    );
  }
};
// for Updating Single Item
export const PUT = async (request, { params }) => {
  var { itemId } = params;
  const { itemName, itemSize } = await request.json();
  try {
    const item = await Item.findOne({ _id: itemId });
    if (!item)
      return NextResponse.json(
        { error: "item not found", success: false },
        { status: 404 }
      );
    const ExistingName = await Item.findOne({
      ItemName: itemName.toLowerCase(),
    });
    const ExistingSize = await Item.findOne({
      size: itemSize.toLowerCase(),
    });
    // console.log(ExistingName, ExistingSize);
    if (ExistingName)
      return NextResponse.json(
        { message: "Item already exists" },
        { status: 409 }
      );
    if (ExistingSize)
      return NextResponse.json(
        { message: "Size already exists" },
        { status: 409 }
      );
    const data = await Item.updateOne(
      { _id: itemId },
      { ItemName: itemName.toLowerCase(), size: itemSize.toLowerCase() }
    );
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "error in updating Item", success: false },
      { status: 500 }
    );
  }
};
// for Deleting Single Item
export async function DELETE(request, { params }) {
  var { itemId } = params;
  try {
    const item = await Item.deleteOne({ _id: itemId });
    if (!item)
      return NextResponse.json(
        { error: "item not found", success: false },
        { status: 404 }
      );
    return NextResponse.json(
      { message: "item deleted successfully", success: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "error in deleting Item", success: false },
      { status: 500 }
    );
  }
}