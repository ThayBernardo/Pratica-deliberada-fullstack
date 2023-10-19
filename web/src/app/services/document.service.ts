import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Document from '../interfaces/document.interface';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private url: string = 'http://localhost:8000/document';

  constructor(private http: HttpClient) {}

  create = (document: Document): Observable<Document> => {
    return this.http.post<Document>(`${this.url}/create`, document);
  };

  getAll = (): Observable<Document[]> => {
    return this.http.get<Document[]>(`${this.url}/`);
  };

  getById = (id: number): Observable<Document> => {
    return this.http.get<Document>(`${this.url}/${id}/detail`);
  };

  update = (id: number, document: any): Observable<Document> => {
    return this.http.put<any>(`${this.url}/${id}/update`, document);
  };

  delete = (id: number): Observable<Document> => {
    return this.http.delete<Document>(`${this.url}/${id}/delete`);
  };

  getDocumentsByUser = (email: string): Observable<Document> => {
    return this.http.get<Document>(`${this.url}/all_documents_by_user/${email}`);
  };
}
