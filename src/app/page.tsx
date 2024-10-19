"use client";

import { GraphColor } from "@/components/GraphColor";
import { GraphLine } from "@/components/GraphLine";
import { fetchCSV } from "@/lib/fetchCSV";
import { useEffect } from "react";

export default function Home() {
  const data = async () => {
    const csvData = await fetchCSV("src/public/data/tabela.csv");
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
