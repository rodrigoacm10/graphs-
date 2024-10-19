"use client";

import { GraphColor } from "@/components/GraphColor";
import { GraphLine } from "@/components/GraphLine";
import { GraphLineGe } from "@/components/GraphLineGe";
import { getIPCARecife } from "@/data-handlers/getIPCARecife";
import { fetchCSV } from "@/lib/fetchCSV";
import { useEffect, useState } from "react";

export default function Home() {
  const [rec, setRec] = useState<any>([]);

  const data = async () => {
    const csvData = await fetchCSV(
      "src/csv/observatorio_csv/ipca/indice_geral/2023-2024/indice_geral.csv"
    );
    console.log(csvData);

    const recifeIPCA = getIPCARecife(csvData);
    setRec(recifeIPCA);
    console.log(recifeIPCA);
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div></div>
      <GraphColor />
      <GraphLine />
      <GraphLineGe chartData={rec} />
    </div>
  );
}
