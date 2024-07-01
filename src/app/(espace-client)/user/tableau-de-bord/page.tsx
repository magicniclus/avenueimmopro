"use client";

import Drawer from "@/components/tailwindUi/drawers/Drawer";
import SideBarLayout from "@/components/tailwindUi/layout/SideBarLayout";
import { setDrawerOpen } from "@/redux/drawerSlice";
import { useDispatch } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();

  const setOpen = (value: boolean) => {
    dispatch(setDrawerOpen(value));
  };

  return (
    <div className="relative">
      <Drawer />
      <SideBarLayout>
        <h1 className="text-gray-700 font-bold text-2xl">Tableau de bord</h1>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Ouvrir le tiroir
        </button>
      </SideBarLayout>
    </div>
  );
};

export default Page;
