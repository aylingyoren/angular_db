import { Injectable } from '@angular/core';
import { Customer } from './customer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

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
  createData(customer: Customer): void {
    this.http.post<Customer>(`${url}.json`, customer, httpOptions).subscribe(
      (res) => {
        // customer.key = res.name;
        this.customers.push({ ...{ key: res.name }, ...customer });
        // this.customers.push(customer);
      },
      catchError(this.errorHandler<Customer>('POST'))
      // (err) => console.log(err)
    );
  }

  // Read = GET
  getData(): void {
    this.http.get<Customer[]>(`${url}.json`, httpOptions).subscribe((res) => {
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
    }, catchError(this.errorHandler<Customer[]>('GET')));
  }

  //Update = PUT / PATCH
  update(customer: Customer, i: number): any {
    const { key, ...data } = customer;

    return this.http
      .put<Customer>(`${url}/${key}.json`, data, httpOptions)
      .subscribe(() => {
        // this.customers[i] = mergeCustomer;
        this.customers[i] = customer;
      }, catchError(this.errorHandler<Customer[]>('PUT')));
  }

  // Delete = DELETE
  delete(customer: Customer): void {
    //siteurl/customers/userID.json
    this.http
      .delete<void>(`${url}/${customer.key}.json`, httpOptions)
      .subscribe(
        () => this.customers.splice(this.customers.indexOf(customer), 1),
        catchError(this.errorHandler<Customer>('DELETE'))
      );
  }

  private errorHandler<T>(operation: string, res?: T): any {
    return (err: any): Observable<T> => {
      console.error(`${operation} failed: ${err}`);
      return of(res as T);
    };
  }
}
