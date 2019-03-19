export interface ICar {
  info: {
    readonly name: string;
    kilometrage: number;
    readonly fuelTankVolume: number;
    currentFuelValue: number;
    readonly additionalProperties?: string[];
  };
  drive(distance: number): void;
  refuel(fuelValue: number): void;
}
