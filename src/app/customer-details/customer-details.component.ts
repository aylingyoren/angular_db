import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Customer } from '../shared/customer';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
  form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required, Validators.minLength(8)]],
    location: ['', [Validators.required]],
  });

  name: AbstractControl;
  email: AbstractControl;
  mobile: AbstractControl;
  location: AbstractControl;

  constructor(public svc: HttpService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createControls();

    // const tempCustomer: Customer = {
    //   name: 'Kate',
    //   email: 'kate@example.com',
    //   mobile: '987345123',
    //   location: 'Kiev',
    // };
    // this.svc.createData(tempCustomer);
  }

  onSubmit(): void {
    console.log(this.form.value);
    if (this.form.value) {
      this.svc.createData(this.form.value);
    }
  }

  private createControls(): void {
    this.name = this.form.controls.name;
    this.email = this.form.controls.email;
    this.mobile = this.form.controls.mobile;
    this.location = this.form.controls.location;

    this.name.setValue('Jean');
    this.email.setValue('jean@gmail.com');
    this.mobile.setValue('987654321');
    this.location.setValue('Berlin');
  }
}
