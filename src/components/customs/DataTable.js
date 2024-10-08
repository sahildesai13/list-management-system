import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector, useDispatch } from "react-redux";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from '../ui/button';
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "../api-caller/ApiClient";
import { addData } from "@/hooks/redux/listSlice";

export function DataTable() {
  const { toast } = useToast();
  const data = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [openDrawerId, setOpenDrawerId] = useState(null);
  const [clipboard, setClipboard] = useState([]);

  const fetchData = async () => {
    try {
      const response = await apiClient('/api/items'); // Adjust the endpoint as necessary

      // Check if response has an error or no data
      if (response.error || !response.data || response.data.length === 0) {
        // Update Redux store with an empty array to clear the data
        dispatch(addData([]));
        toast({ description: "No items found." });
      } else {
        dispatch(addData(response.data)); // Update the Redux store with new data
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast({ description: "Failed to fetch data." });
    }
  };


  const handleDrawerOpen = (id, ele) => {
    setOpenDrawerId(id);
    setClipboard(prevClipboard => {
      const itemIndex = prevClipboard.findIndex(item => item.itemName === ele.ItemName && item.size === ele.size);
      if (itemIndex !== -1) {
        const updatedClipboard = [...prevClipboard];
        updatedClipboard[itemIndex].quantity += 1;
        return updatedClipboard;
      }
      return [...prevClipboard, { itemName: ele.ItemName, size: ele.size, quantity: 1 }];
    });
  };

  const handleDrawerClose = () => {
    setOpenDrawerId(null);
  };

  const handleCopyToClipboard = () => {
    const copyText = clipboard.map(item =>
      `${item.itemName} (Size: ${item.size}, Quantity: ${item.quantity})`
    ).join('\n');

    navigator.clipboard.writeText(copyText)
      .then(() => {
        toast({ description: "Items copied to clipboard!" });
      })
      .catch(err => {
        console.error("Could not copy text: ", err);
      });
    handleDrawerClose();
  };

  const callApiDelete = async ({ itemId, event }) => {
    event.stopPropagation();

    try {
      const response = await apiClient(`/api/items/${itemId}`, { method: 'DELETE' });
      if (response.success) { // Check if deletion was successful
        toast({ description: "Item deleted successfully!" });
        fetchData(); // Fetch updated data
      } else {
        toast({ description: response.message || "Failed to delete item." });
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
      toast({ description: "Error deleting item." });
    }
  };

  useEffect(() => {
    fetchData(); // Fetch initial data on component mount
  }, []);

  return (
    <div className="bg-border p-5 rounded-md shadow-2xl">
      <h1 className="text-2xl font-bold text-center">Item List</h1>
      <Table>
        <TableCaption>A list of Items with Size.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead>Item Name</TableHead>
            <TableHead>size</TableHead>
            <TableHead>DB id</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((ele, ind) => (
              <React.Fragment key={ind}>
                <TableRow onClick={() => handleDrawerOpen(ind, ele)}>
                  <TableCell>{ind + 1}</TableCell>
                  <TableCell>{ele.ItemName}</TableCell>
                  <TableCell>{ele.size}</TableCell>
                  <TableCell>{ele._id}</TableCell>
                  <TableCell>
                    <Button
                      onClick={(event) => callApiDelete({ itemId: ele._id, event })}
                      variant="destructive"
                      size="sm"
                      className="text-xs">
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>

                {/* Drawer for each item */}
                <Drawer open={openDrawerId === ind} onOpenChange={handleDrawerClose}>
                  <DrawerContent>
                    <DrawerHeader className="text-start">
                      <DrawerTitle>Selected Items</DrawerTitle>
                      <DrawerDescription>
                        Here are the items you've selected:
                      </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                      <ul className="mb-2 list-decimal mx-auto px-10 max-h-[400px] overflow-y-auto">
                        {clipboard.length > 0 ? (
                          clipboard.map((item, index) => (
                            <li key={index}>
                              <strong>Item Name:</strong> {item.itemName} -
                              <strong> Size:</strong> {item.size} -
                              <strong> Quantity:</strong> {item.quantity}
                            </li>
                          ))
                        ) : (
                          <div>No items selected</div>
                        )}
                      </ul>
                      <DrawerClose asChild>
                        <Button className="mx-auto w-full md:w-1/2 lg:w-1/3" variant="outline" onClick={handleDrawerClose}>Select More Items</Button>
                      </DrawerClose>
                      <Button className="mx-auto w-full md:w-1/2 lg:w-1/3" onClick={handleCopyToClipboard}>Copy to Clipboard</Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </React.Fragment>
            ))
          ) : (
            <div className="text-center">No Data Found</div>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
