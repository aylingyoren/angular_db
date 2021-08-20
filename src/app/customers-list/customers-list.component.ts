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
  private tempCustomer: Customer;

  constructor(public svc: HttpService) {}

  ngOnInit(): void {
    this.svc.getData();
  }

  editCustomer(i: number): void {
    this.isEditPos = i;
    this.tempCustomer = this.resetCustomer();
  }
  cancelEdit(): void {
    this.isEditPos = null;
    this.tempCustomer = this.resetCustomer();
  }
  setValue(key: string, value: FocusEvent | any, original: string): void {
    if (value !== original) {
      this.tempCustomer[key] = value;
      console.log(this.tempCustomer);
    }
  }
  saveCustomer(customer: Customer, i): void {
    // merge customer with tempCustomer
    // console.log('original Customer', customer);
    // console.log('temp Customer', this.tempCustomer);
    const mergeCustomer: Customer = this.mergeCustomerProps(
      customer,
      this.tempCustomer
    );
    this.svc.update(mergeCustomer, i);
    this.isEditPos = null;
  }
  deleteCustomer(customer: Customer): void {
    this.svc.delete(customer);
  }

  private resetCustomer(): Customer {
    return {
      key: null,
      name: null,
      email: null,
      mobile: null,
      location: null,
    };
  }

  private mergeCustomerProps(original: Customer, temp: Customer): Customer {
    const result = { ...original };

    Object.keys(temp).forEach((key) => {
      if (temp[key]) {
        result[key] = temp[key];
      }
    });

    return result;
  }
}
