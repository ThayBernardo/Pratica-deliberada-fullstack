import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Company from '../interfaces/company.interface';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private url: string = 'http://localhost:8000/company';

  constructor(private http: HttpClient) {}

  create = (company: Company): Observable<Company> => {
    return this.http.post<Company>(`${this.url}/create`, company);
  };

  getAll = (): Observable<Company[]> => {
    return this.http.get<Company[]>(`${this.url}/`);
  };

  getById = (id: number): Observable<Company> => {
    return this.http.get<Company>(`${this.url}/${id}/detail`);
  };

  update = (id: number, company: any): Observable<Company> => {
    return this.http.put<any>(`${this.url}/${id}/update`, company);
  };

  delete = (id: number): Observable<Company> => {
    return this.http.delete<Company>(`${this.url}/${id}/delete`);
  };

  getCompanysByUserId = (user_id: number): Observable<Company[]> => {
    return this.http.get<Company[]>(`${this.url}/${user_id}/companys`);
  };
}
