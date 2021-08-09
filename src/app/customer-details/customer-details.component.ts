import { Component, OnInit } from '@angular/core';
import { Customer } from '../shared/customer';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
  constructor(public svc: HttpService) {}

  ngOnInit(): void {
    // const tempCustomer: Customer = {
    //   name: 'Kate',
    //   email: 'kate@example.com',
    //   mobile: '987345123',
    //   location: 'Kiev',
    // };
    // this.svc.createData(tempCustomer);
  }
}
