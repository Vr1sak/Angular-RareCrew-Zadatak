import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTabela } from './employee-tabela';

describe('EmployeeTabela', () => {
  let component: EmployeeTabela;
  let fixture: ComponentFixture<EmployeeTabela>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeTabela]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeTabela);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
