"use client";

import Bar from "@/components/recharts/Bar";
import Drawer from "@/components/tailwindUi/drawers/Drawer";
import SideBarLayout from "@/components/tailwindUi/layout/SideBarLayout";

const leadsRecus = [
  { name: "Janvier", value: 5 },
  { name: "Février", value: 3 },
  { name: "Mars", value: 6 },
  { name: "Avril", value: 4 },
  { name: "Mai", value: 2 },
  { name: "Juin", value: 5 },
  { name: "Juillet", value: 4 },
  { name: "Août", value: 4 },
  { name: "Septembre", value: 2 },
  { name: "Octobre", value: 5 },
  { name: "Novembre", value: 4 },
  { name: "Décembre", value: 4 },
];

const mandats = [
  { name: "Janvier", value: 1 },
  { name: "Février", value: 2 },
  { name: "Mars", value: 0 },
  { name: "Avril", value: 1 },
  { name: "Mai", value: 1 },
  { name: "Juin", value: 1 },
  { name: "Juillet", value: 0 },
  { name: "Août", value: 1 },
  { name: "Septembre", value: 1 },
  { name: "Octobre", value: 2 },
  { name: "Novembre", value: 1 },
  { name: "Décembre", value: 1 },
];

const Page = () => {
  return (
    <div className="relative">
      <Drawer />
      <SideBarLayout>
        <h1 className="text-gray-700 font-bold text-2xl">Performances</h1>
        <div style={{ width: "100%", height: 300 }}>
          <h2 className="text-gray-700 font-semibold text-xl mt-14 mb-7">
            Nombre de leads reçus:
          </h2>
          <Bar
            data={leadsRecus}
            barName="Leads reçus"
            barColor="#2563eb"
            height={300}
          />
        </div>{" "}
        <div style={{ width: "100%", height: 300 }}>
          <h2 className="text-gray-700 font-semibold text-xl mt-14 mb-7">
            Mandats rentrés:
          </h2>
          <Bar
            data={mandats}
            barName="Nombre de mandats rentrés"
            barColor="#eab308"
            height={300}
          />
        </div>
      </SideBarLayout>
    </div>
  );
};

export default Page;
