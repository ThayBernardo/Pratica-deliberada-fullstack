import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import User, {UserToCreate} from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string = 'http://localhost:8000/user';

  constructor(private http: HttpClient) {
  }

  create = (user: UserToCreate): Observable<UserToCreate> => {
    return this.http.post<UserToCreate>(`${this.url}/create`, user);
  };

  getAll = (): Observable<User[]> => {
    return this.http.get<User[]>(`${this.url}/`);
  };

  getById = (id: number): Observable<User> => {
    return this.http.get<User>(`${this.url}/${id}/detail`);
  };

  update = (id: number, user: User): Observable<User> => {
    return this.http.put<User>(`${this.url}/${id}/update`, document);
  };

  delete = (id: number): Observable<User> => {
    return this.http.delete<User>(`${this.url}/${id}/delete`);
  };

  getByEmail = (email: string): Observable<User> => {
    return this.http.get<User>(`${this.url}/${email}`);
  };

  verifyUserPassword = (email: string, password: string): Observable<User> => {
    return this.http.get<User>(`${this.url}/verify_password/${email}/${password}`);
  };
}
