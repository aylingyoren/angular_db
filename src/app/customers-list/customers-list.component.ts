import { Component, OnInit } from '@angular/core';
import { Customer } from '../shared/customer';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss'],
})
export class CustomersListComponent implements OnInit {
  isEditPos: null | number = null;

  constructor(public svc: HttpService) {}

  ngOnInit(): void {
    this.svc.getData();
  }

  editCustomer(i: number): void {
    this.isEditPos = i;
  }
  cancelEdit(): void {
    this.isEditPos = null;
  }
  saveCustomer(customer: Customer): void {
    console.log('saveCustomer:', customer);
  }
  deleteCustomer(customer: Customer): void {
    console.log('deleteCustomer:', customer);
  }
}
