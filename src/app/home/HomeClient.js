"use client";

import EnterData from '@/components/add-data/EnterData';
import { apiClient } from '@/components/api-caller/ApiClient';
import { DataTable } from '@/components/customs/DataTable';
import { ThemeSwitch } from '@/components/customs/ThemeSwitch';
import { addData } from '@/hooks/redux/listSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const HomeClient = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsHydrated(true);
    callApi();
  }, []);

  async function callApi() {
    const result = await apiClient('/api/items', {
      method: 'GET',
    });
    console.log(result);
    dispatch(addData(result));
  }

  if (!isHydrated) {
    return null; // Don't render UI until the component is hydrated
  }

  return (
    <div className="container space-y-10 py-2 relative">
      <div className="fixed top-2 right-2 lg:top-10 lg:right-10">
        <ThemeSwitch />
      </div>
      <div className="mx-2 lg:w-1/3 lg:mx-auto">
        <EnterData />
      </div>
      <div className="mx-2 lg:mx-0">
        <DataTable />
      </div>
    </div>
  );
};

export default HomeClient;
