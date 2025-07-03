import { Component } from '@angular/core';
import { Employee } from '../employee';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-employee-tabela',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NgChartsModule],
  templateUrl: './employee-tabela.html',
  styleUrl: './employee-tabela.css'
})
export class EmployeeTabela {

  constructor(private http : HttpClient){ }

  employees: Employee[] = [];
  grupisani: { [name: string]: { EmployeeName: string; UkupnoSati: number } } = {};
  sortirani: { EmployeeName: string; UkupnoSati: number }[] = [];


  ngOnInit() {  

    console.log("usao")

    this.http.get<Employee[]>('https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==').subscribe(res => {
    this.employees = res
  
   this.employees.forEach(e => {
    if (!this.grupisani[e.EmployeeName]) {
      this.grupisani[e.EmployeeName] = {
        EmployeeName: e.EmployeeName,
        UkupnoSati: 0
      };
    }
    this.grupisani[e.EmployeeName].UkupnoSati += this.izracunajSate(e);
  });

    this.sortirani = Object.values(this.grupisani);

    this.sortirani = this.sortirani.sort((a, b) => b.UkupnoSati - a.UkupnoSati);

  });  

  }

  izracunajSate(e: Employee): number {
    const start = new Date(e.StarTimeUtc.toString());
    const end = new Date(e.EndTimeUtc.toString());
    return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  }
}
