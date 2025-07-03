import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeTabela } from './employee-tabela/employee-tabela';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EmployeeTabela],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected title = 'angular-zadatak';
  
}