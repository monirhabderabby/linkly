"use client";
import { DataTable } from "@/components/ui/data-table";
import { useGSAP } from "@gsap/react";
import { urls } from "@prisma/client";
import gsap from "gsap";
import React from "react";
import { columns } from "../column";

interface HistoryProps {
  urls: urls[];
}

const History: React.FC<HistoryProps> = ({ urls }) => {
  useGSAP(() => {
    gsap.fromTo(
      "#history",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.5,
        ease: "power3.inOut",
      }
    );
  }, []);

  return (
    <div id="history" className="container min-h-[400px] ">
      <DataTable columns={columns} data={urls} />
    </div>
  );
};

export default History;
