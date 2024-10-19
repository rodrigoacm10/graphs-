export function getIPCARecife(data: string[][]) {
  // A linha 3 (índice 3) contém os meses
  const months = data[3].slice(2); // Começa no índice 2 para pegar os meses

  // A linha 13 (índice 13) contém os valores do IPCA de Recife
  const recifeValues = data[13]
    .slice(2)
    .map((value) => parseFloat(value.replace(",", "."))); // Converte para números

  // Cria um array de objetos com o mês e o valor de Recife
  const result = months.map((month, index) => ({
    month: month,
    desktop: recifeValues[index],
  }));

  return result;
}
