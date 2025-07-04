import { Component } from '@angular/core';
import { Employee } from '../employee';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartType, Chart } from 'chart.js';
import  ChartDataLabels  from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels);

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
  ukupnoSati: number = 0;


  public pieChartData: ChartData<'pie', number[], string> = {
    labels: [],
    datasets: [{ data: [] }]
  };
  pieChartType: 'pie' = 'pie';

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      datalabels: {
        color: '#000',
        formatter: (value, ctx) => {
          const procenat = (value as number) / this.ukupnoSati * 100;
          return `${procenat.toFixed(2)}%`;
        }
      }
    }
  };

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
    this.ukupnoSati = this.sortirani.reduce((sum, e) => sum + e.UkupnoSati, 0);
    var sortiraniBezNull = this.sortirani.filter(x => x.EmployeeName);

    this.pieChartData = {
          labels: sortiraniBezNull.map(x => x.EmployeeName),
          datasets: [{ data: sortiraniBezNull.map(x => +x.UkupnoSati) }]
        };
  });  

  }

  izracunajSate(e: Employee): number {
    const start = new Date(e.StarTimeUtc.toString());
    const end = new Date(e.EndTimeUtc.toString());
    return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  }
}