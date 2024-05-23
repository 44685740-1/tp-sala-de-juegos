import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService {
  private jsonUrl = 'assets/palabrasAhorcado.json';

  constructor(private http: HttpClient) {}

  getRandomWord(): Observable<string> {
    return new Observable<string>((observer) => {
      this.http.get<{ palabras: string[] }>(this.jsonUrl).subscribe((data) => {
        const palabra = data.palabras;
        const randomWord = palabra[Math.floor(Math.random() * palabra.length)];
        observer.next(randomWord);
        observer.complete();
      });
    });
  }

}
