"use client";

import Drawer from "@/components/tailwindUi/drawers/Drawer";
import SideBarLayout from "@/components/tailwindUi/layout/SideBarLayout";
import DataTableDemo from "@/components/tailwindUi/list/List";

const page = () => {
  return (
    <div className="relative">
      <Drawer />
      <SideBarLayout>
        <h1 className="text-gray-700 font-bold text-2xl">Gestion des leads</h1>
        <div className="mt-14">
          <DataTableDemo withButton={false} />
        </div>
      </SideBarLayout>
    </div>
  );
};

export default page;
