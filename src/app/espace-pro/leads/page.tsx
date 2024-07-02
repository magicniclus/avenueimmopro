"use client";

import Drawer from "@/components/tailwindUi/drawers/Drawer";
import SideBarLayout from "@/components/tailwindUi/layout/SideBarLayout";

const page = () => {
  return (
    <div className="relative">
      <Drawer />
      <SideBarLayout>
        <h1 className="text-gray-700 font-bold text-2xl">Gestion des leads</h1>
      </SideBarLayout>
    </div>
  );
};

export default page;
