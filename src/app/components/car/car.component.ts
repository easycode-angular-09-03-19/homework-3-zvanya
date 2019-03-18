import { Component } from '@angular/core';
import { ICar } from '../../interfaces/ICar'

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styles: [`
    ul {
      padding-left: 20px;
    }
  
    #carControl :nth-of-type(2) {
      margin-left: 30px;
    }
  `]
})
export class CarComponent implements ICar {
  
  private _name: string;
  private _kilometrage: number;
  private _fuelTankVolume: number;
  private _currentFuelValue: number;
  private _additionalProperties: string[];
  
  public info;
  
  private _distance: number = 5;
  private _fuel: number = 5;
  private _isTankEmpty: boolean = false;
  private _isDistanceCorrect: boolean = true;
  private _isRefuelValueCorrect: boolean = true;
  private _isRefuelVolumeCorrect: boolean = true;
  
  constructor() {
    this._name = "BMW";
    this._kilometrage = 0;
    this._fuelTankVolume = 50;
    this._currentFuelValue = 0;
    this._additionalProperties = ['Engine: 4L', 'Max speed: 350km/h', 'Type: sport-car'];
    
    this.info = {
      name: this._name,
      fuelTankVolume: this._fuelTankVolume,
      kilometrage: this._kilometrage,
      currentFuelValue: this._currentFuelValue,
      additionalProperties: this._additionalProperties
    };
    
    this.updateInfo();
  }
  
  /**
   * drive: поехать на distance километров
   * @param {Number} distance
   */
  public drive(distance: number): void {
    if (this._currentFuelValue < 1) return;
    
    if (!isNumberCorrect(distance)) {
      this._isDistanceCorrect = false;
      return;
    }
    
    this._isDistanceCorrect = true;
    
    this._kilometrage += +distance;
    this._currentFuelValue--;
    
    this.updateInfo();
  }
  
  private _drive(e): void {
    if (e.keyCode === 13) this.drive(+e.target.value);
  }
  
  /**
   * refuel: Дозаправка машины на fuelValue литров топлива
   * @param {Number} fuelValue
   */
  public refuel(fuelValue: number): void {
    if (!isNumberCorrect(fuelValue)) {
      this._isRefuelValueCorrect = false;
      return;
    }
    
    if (+fuelValue + this._currentFuelValue > this._fuelTankVolume) {
      this._isRefuelVolumeCorrect = false;
      return;
    }
    
    this._isRefuelValueCorrect = true;
    this._isRefuelVolumeCorrect = true;
    
    this._currentFuelValue += +fuelValue;
    
    this.updateInfo();
  }
  
  private _refuel(e): void {
    if (e.keyCode === 13) this.refuel(+e.target.value);
  }
  
  /**
   * Обновление инфы о машине
   */
  private updateInfo(): void {
    this.info.name = this._name;
    this.info.kilometrage = this._kilometrage;
    this.info.fuelTankVolume = this._fuelTankVolume;
    this.info.currentFuelValue = this._currentFuelValue;
    this.info.additionalProperties = this._additionalProperties;
    
    this._isTankEmpty = this._currentFuelValue < 1;
  }
  
}

// Helper
function isNumberCorrect(n: number): boolean {
  return isFinite(n) && n > 0;
}
