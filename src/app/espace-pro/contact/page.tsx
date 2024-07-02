"use client";

import Contact from "@/components/tailwindUi/contact/Contact";
import Drawer from "@/components/tailwindUi/drawers/Drawer";
import SideBarLayout from "@/components/tailwindUi/layout/SideBarLayout";

const page = () => {
  return (
    <div className="relative">
      <Drawer />
      <SideBarLayout>
        <Contact />
      </SideBarLayout>
    </div>
  );
};

export default page;
