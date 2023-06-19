export interface CropAttributes {
  producerId: number;
  cropName: AllowedCrops;
  area: number;
}

export enum AllowedCrops {
  Soybeans = "Soja",
  Corn = "Milho",
  Cotton = "Algodão",
  Coffee = "Café",
  Sugarcane = "Cana de Açúcar",
}
