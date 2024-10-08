import { connectDB } from "@/helper/db";
import { Item } from "@/models/listModel";
import { NextResponse } from "next/server";

connectDB();
// for Getting All Items
export async function GET(request) {
  try {
    const items = await Item.find();
    if (items.length === 0)
      return NextResponse.json({ error: "list not found" }, { status: 404 });
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "error in getting List" },
      { status: 200 }
    );
  }
}
// for Creating Single Item
export async function POST(request) {
  const { itemName, itemSize } = await request.json();
  console.log(itemName, itemSize);
  const item = new  Item({
    ItemName: itemName,
    size: itemSize,
  });

  try {
    const ExistingName = await Item.findOne({
      ItemName: itemName,
    });
    const ExistingSize = await Item.findOne({ size: itemSize });
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
    const data = await item.save();

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "error in creating Item" },
      { status: 500 }
    );
  }
}
// for Deleting All Items in development
export async function DELETE(request) {
  return NextResponse.json(
    { message: "Route for All item DELETE is not Available" },
    { status: 500 }
  );
}
// for Updating All Items in development
export async function PUT(request) {
  return NextResponse.json(
    { message: "Route for All item PUT is not Available" },
    { status: 500 }
  );
}