import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = 'http://localhost:3000/messages'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) { }

  getAllMessages(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  createMessage(message: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, message);
  }
}
