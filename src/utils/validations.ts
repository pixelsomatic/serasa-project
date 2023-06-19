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
