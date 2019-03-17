export interface ICar {
  info: {
    name: string;
    kilometrage: number;
    fuelTankVolume: number;
    currentFuelValue: number;
    additionalProperties?: string[];
  };
  drive(distance: number): void;
  refuel(fuelValue: number): void;
}
