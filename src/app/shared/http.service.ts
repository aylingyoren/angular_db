import { Injectable } from '@angular/core';
import { Customer } from './customer';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const url = `https://app-data-db-default-rtdb.europe-west1.firebasedatabase.app/customers`;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  customers: Customer[] = [];

  constructor(private http: HttpClient) {}

  // CRUD
  // Create = POST
  createData(data: Customer): void {
    console.log(data);

    this.http.post<Customer>(`${url}.json`, data, httpOptions).subscribe(
      (res) => console.log(res),

      (err) => console.log(err)
    );
  }

  // Read = GET
  getData(): void {
    this.http.get<Customer[]>(`${url}.json`, httpOptions).subscribe(
      (res) => {
        // -MgfAeoNtazquYRu3y2a:
        //   email: "john@example.com"
        //   location: "Moscow"
        //   mobile: "123345567"
        //   name: "John"
        Object.keys(res).forEach(
          (key) => this.customers.push({ key, ...res[key] })
          // const obj = Object.assign({}, res[key]);
          // obj.key = key;
          // this.customers.push(obj);
        );
      },
      (err) => console.log(err)
    );
  }

  //Update = PUT / PATCH
  update(customer: Customer): any {}

  // Delete = DELETE
  delete(customer: Customer): void {}
}
