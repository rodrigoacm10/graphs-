"use server";

import { parse } from "csv-parse";
import fs from "fs";
import path from "path";

export async function fetchCSV(filePath: string): Promise<any[]> {
  try {
    const fullPath = path.join(process.cwd(), filePath); // Caminho absoluto para o arquivo CSV

    // Verifica se o arquivo existe
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Arquivo CSV não encontrado no caminho: ${fullPath}`);
    }

    // Lê o conteúdo do arquivo CSV
    const fileContent = fs.readFileSync(fullPath, "utf8");

    return new Promise((resolve, reject) => {
      const records: any[] = [];

      // Usa o csv-parse para interpretar o conteúdo CSV
      parse(fileContent, {
        columns: false, // Se você não sabe se o CSV tem cabeçalhos
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
    console.error("Erro ao ler ou processar o CSV:", error);
    throw error;
  }
}
