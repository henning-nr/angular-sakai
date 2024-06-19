import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:3000/clients'; // ajuste conforme sua API

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  getClientById(key: string): Observable<Client> {
    const url = `${this.apiUrl}/${key}`;
    return this.http.get<Client>(url);
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }

  updateClient(key: string, client: Client): Observable<Client> {
    const url = `${this.apiUrl}/${key}`;
    return this.http.put<Client>(url, client);
  }

  deleteClient(key: string): Observable<Client> {
    const url = `${this.apiUrl}/${key}`;
    return this.http.delete<Client>(url);
  }
}
