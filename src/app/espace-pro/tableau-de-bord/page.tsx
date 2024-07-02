"use client";

import ListLink from "@/components/perso/ListLink";
import Drawer from "@/components/tailwindUi/drawers/Drawer";
import FAQ from "@/components/tailwindUi/faq/FAQ";
import SideBarLayout from "@/components/tailwindUi/layout/SideBarLayout";
import List from "@/components/tailwindUi/list/List";
import Stats from "@/components/tailwindUi/stats/Stats";
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
        <div className="mt-14">
          <Stats />
        </div>
        <div className="mt-14">
          <List />
        </div>
        <div className="flex justify-between flex-col md:flex-row mt-14">
          <ListLink />
          <FAQ />
        </div>
      </SideBarLayout>
    </div>
  );
};

export default Page;
