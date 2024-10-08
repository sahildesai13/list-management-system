"use client";

import React, { useState } from 'react';
import { apiClient } from '../api-caller/ApiClient';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useDispatch } from 'react-redux';
import { addData } from '@/hooks/redux/listSlice';
import { useToast } from '@/hooks/use-toast';

const EnterData = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    itemSize: '',
  });
  const { toast } = useToast()
  const dispatch = useDispatch();

  async function callApi() {
    console.log("Submitting data to API...");
    const response = await apiClient('/api/items', {
      method: 'POST',
      body: {
        itemName: formData.itemName,
        itemSize: formData.itemSize,
      },
    });

    return response;
  }

  async function handleClick() {
    try {
      // Call API and wait for result
      const result = await callApi();
      if (result && !result.error) {
        console.log('Data submitted successfully:', result);

        // Call the API to fetch updated data and update the Redux store
        const updatedData = await apiClient('/api/items', { method: 'GET' });
        if (updatedData && !updatedData.error) {
          dispatch(addData(updatedData));
          toast({ description: 'Data updated successfully' });
        } else {
          toast('Failed to fetch updated data');
          console.error('Failed to fetch updated data:', updatedData.error);
        }
      } else {
        toast({ variant: "destructive", description: JSON.parse(result.error).message });
        console.error('Failed to submit data:', JSON.parse(result.error).message);
      }
    } catch (error) {
      console.error('Error during submission:', error);
    }
  }

  return (
    <div>
      <div className="px-10 py-5 rounded-md bg-border shadow-xl">
        <Input
          type="text"
          placeholder="Item Name"
          value={formData.itemName}
          onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
        /> <br />
        <Input
          type="text"
          placeholder="Size"
          value={formData.itemSize}
          onChange={(e) => setFormData({ ...formData, itemSize: e.target.value })}
        /> <br />
        <Button variant="outline" size="sm" onClick={handleClick}>Submit</Button>
      </div>
    </div>
  );
}

export default EnterData;
