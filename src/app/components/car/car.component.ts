import { Component } from '@angular/core';
import { ICar } from '../../interfaces/ICar'

class Car implements ICar{
  readonly name: string;
  kilometrage: number;
  readonly fuelTankVolume: number;
  currentFuelValue: number;
  readonly additionalProperties: string[];
}

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {
  
  public car: Car;

  public _distance: number = 5;
  public _fuel: number = 5;
  
  public _isTankEmpty: boolean = false;
  public _isDistanceCorrect: boolean = true;
  public _isRefuelValueCorrect: boolean = true;
  public _isRefuelVolumeCorrect: boolean = true;
  
  constructor() {
    this.car = {
      name: "BMW",
      kilometrage: 0,
      fuelTankVolume: 50,
      currentFuelValue: 0,
      additionalProperties: ['Engine: 4L', 'Max speed: 350km/h', 'Type: sport-car']
    };
  
    this.updateInfo();
  }
  
  /**
   * drive: поехать на distance километров
   * @param {Number} distance
   */
  public drive(distance: number | string): void {
    if (this.car.currentFuelValue < 1) return;
    
    if (!isNumberCorrect(+distance)) {
      this._isDistanceCorrect = false;
      return;
    }
    
    this._isDistanceCorrect = true;
    
    this.car.kilometrage += +distance;
    this.car.currentFuelValue--;
    
    this.updateInfo();
  }
  
  private _drive(e): void {
    if (e.keyCode === 13) this.drive(+e.target.value);
  }
  
  /**
   * refuel: Дозаправка машины на fuelValue литров топлива
   * @param {Number} fuelValue
   */
  public refuel(fuelValue: number | string): void {
    if (!isNumberCorrect(+fuelValue)) {
      this._isRefuelValueCorrect = false;
      this._isRefuelVolumeCorrect = true;
      return;
    }
    this._isRefuelValueCorrect = true;
  
    if (+fuelValue + this.car.currentFuelValue > this.car.fuelTankVolume) {
      this._isRefuelVolumeCorrect = false;
      return;
    }
    this._isRefuelVolumeCorrect = true;
    
    this.car.currentFuelValue += +fuelValue;
    
    this.updateInfo();
  }
  
  private _refuel(e): void {
    if (e.keyCode === 13) this.refuel(+e.target.value);
  }
  
  /**
   * Обновление инфы о машине
   */
  private updateInfo(): void {
    this._isTankEmpty = this.car.currentFuelValue < 1;
  }
  
}

// Helper
function isNumberCorrect(n: number): boolean {
  return isFinite(n) && n > 0;
}
