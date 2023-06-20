export function validateArea(
  arableArea: number,
  vegetationArea: number,
  totalArea: number
) {
  const sum = arableArea + vegetationArea;
  if (sum > totalArea) {
    return false;
  }
  return true;
}

export const determineTaxIdType = (unformattedTaxId: string) => {
  return unformattedTaxId.length === 11 ? "CPF" : "CNPJ";
};
