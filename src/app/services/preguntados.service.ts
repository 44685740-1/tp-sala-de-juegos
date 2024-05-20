import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {
  private apiUrl = "https://the-trivia-api.com/api/questions?categories=history,sport_and_leisure&limit=1&region=AR&difficulty=easy";

  constructor(private api : HttpClient) {}

  getQuestion(): Observable<any> {
    return this.api.get<any>(this.apiUrl);
  }
}
