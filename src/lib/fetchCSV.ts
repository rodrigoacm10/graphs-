"use server";

import axios from "axios";
import { parse } from "csv-parse";

export async function fetchCSV(url: string): Promise<any[]> {
  try {
    // Faz a requisição para obter o conteúdo do CSV
    const response = await axios.get(url, { responseType: "text" });

    return new Promise((resolve, reject) => {
      const records: any[] = [];

      // Usa o csv-parse para interpretar o conteúdo CSV
      parse(response.data, {
        columns: false, // Se você não souber se o CSV tem cabeçalhos ou não
        skip_empty_lines: true,
      })
        .on("data", (row: any) => {
          records.push(row);
        })
        .on("end", () => {
          resolve(records);
        })
        .on("error", (error: Error) => {
          reject(error);
        });
    });
  } catch (error) {
    console.error("Erro ao baixar ou processar o CSV:", error);
    throw error;
  }
}
