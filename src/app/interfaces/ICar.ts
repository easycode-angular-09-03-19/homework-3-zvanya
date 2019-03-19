export interface ICar {
  readonly name: string;
  kilometrage: number;
  readonly fuelTankVolume: number;
  currentFuelValue: number;
  readonly additionalProperties?: string[];
}
