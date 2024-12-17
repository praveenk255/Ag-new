import { Component } from '@angular/core';
import { FlightDataService } from './flight-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showFlightDataManagement = false;
  flights: any[] = [];
  flightForm = {
    flightNumber: '',
    sta: '',
    std: '',
  };

  selectedFlight: any = null;
  std: string = '';
  sta: string = '';

  // Main page form
  ata: string = '';
  fpb: string = '';
  lpb: string = '';
  dc: string = '';
  atd: string = '';
  dcStatus: string = '';
  arrivalWheelchairs: string = 'N/A';
  departureWheelchairs: string = 'N/A';

  results: any = null;

  constructor(private flightService: FlightDataService) {
    this.loadFlights();
  }

  toggleFlightDataManagement() {
    this.showFlightDataManagement = !this.showFlightDataManagement;
  }

  loadFlights() {
    this.flights = this.flightService.getFlights();
  }

  addFlight() {
    this.flightService.addFlight({ ...this.flightForm });
    this.resetForm();
    this.loadFlights();
  }

  resetForm() {
    this.flightForm = { flightNumber: '', sta: '', std: '' };
  }

  deleteFlight(index: number) {
    this.flightService.deleteFlight(index);
    this.loadFlights();
  }

  uploadExcel(event: any) {
    // Excel upload and parsing logic (simplified)
    const file = event.target.files[0];
    if (file) {
      // Simulate parsing Excel
      this.flightService.setFlightsFromExcel([
        { flightNumber: 'FL123', sta: '10:00', std: '10:30' },
        { flightNumber: 'FL456', sta: '11:00', std: '11:30' },
      ]);
      this.loadFlights();
    }
  }

  onFlightSelection() {
    const selected = this.flights.find(
      (f) => f.flightNumber === this.selectedFlight
    );
    if (selected) {
      this.sta = selected.sta;
      this.std = selected.std;
    }
  }

  calculateResults() {
    const diffDC =
      this.calculateTimeDifference(this.ata, this.dc) || 'N/A';
    const diffATD =
      this.calculateTimeDifference(this.ata, this.atd) || 'N/A';

    this.results = {
      flightNumber: this.selectedFlight,
      sta: this.sta,
      std: this.std,
      ata: this.ata,
      fpb: this.fpb,
      lpb: this.lpb,
      dc: this.dc,
      atd: this.atd,
      dcStatus: this.dcStatus,
      arrivalWheelchairs: this.arrivalWheelchairs,
      departureWheelchairs: this.departureWheelchairs,
      diffDC,
      diffATD,
    };
  }

  calculateTimeDifference(time1: string, time2: string): number | null {
    if (!time1 || !time2) return null;
    const t1 = new Date(`1970-01-01T${time1}`);
    const t2 = new Date(`1970-01-01T${time2}`);
    return (t2.getTime() - t1.getTime()) / (1000 * 60);
  }
}
