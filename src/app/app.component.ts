import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FlightDataService {
  private flightData: any[] = [];

  constructor() {}

  getFlights() {
    return this.flightData;
  }

  addFlight(flight: any) {
    this.flightData.push(flight);
  }

  updateFlight(index: number, updatedFlight: any) {
    this.flightData[index] = updatedFlight;
  }

  deleteFlight(index: number) {
    this.flightData.splice(index, 1);
  }

  setFlightsFromExcel(data: any[]) {
    this.flightData = data;
  }
}
