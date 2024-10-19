"use client";

import { GraphColor } from "@/components/GraphColor";
import { GraphLine } from "@/components/GraphLine";
import { fetchCSV } from "@/lib/fetchCSV";
import { useEffect } from "react";

export default function Home() {
  const data = async () => {
    const csvData = await fetchCSV(
      "https://docs.google.com/spreadsheets/d/1vsFO_kUeadrTeCSpk4UZlZlyVuk8MAPeOXNN6B_rhtY/export?format=csv&gid=135093401"
    );
    console.log(csvData);
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div></div>
      <GraphColor />
      <GraphLine />
    </div>
  );
}
