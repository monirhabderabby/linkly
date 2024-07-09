"use client";
import LineTabs from "@/components/snippet/line-tabs";
import { urls } from "@prisma/client";
import React, { useState } from "react";
import History from "./history/history";
import Settings from "./settings/settings";
const tabs = ["History", "Settings"];

interface DashboardTabsProps {
  urls: urls[];
}
const DashboardTabs: React.FC<DashboardTabsProps> = ({ urls }) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  return (
    <div>
      <div className="border-b bg-card">
        <div className="container flex items-center justify-center h-full pt-8">
          <LineTabs tabs={tabs} customID="lineTabs" setActive={setActiveTab} />
        </div>
      </div>

      <div className="py-8">
        {activeTab === "History" ? <History urls={urls} /> : <Settings />}
      </div>
    </div>
  );
};

export default DashboardTabs;
