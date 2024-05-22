import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {
  private apiUrl = "https://the-trivia-api.com/api/questions?categories=film_and_tv,geography,history,sport_and_leisure,music,society_and_culture,general_knowledge,arts_and_literature&limit=1&region=AR&difficulty=medium";

  constructor(private api : HttpClient) {}

  getQuestion(): Observable<any> {
    return this.api.get<any>(this.apiUrl);
  }
}
