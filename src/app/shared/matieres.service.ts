import { Injectable } from '@angular/core';
import { Matiere } from '../matieres/matiere.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatieresService {
  constructor(private http: HttpClient) {}

  backendUrl = 'http://localhost:8010/api/matieres';

  getMatieres(): Observable<Matiere[]> {
    return this.http.get<any>(this.backendUrl).pipe(
      map(response => response.docs)  // Extraire le tableau `docs` de la réponse
    );
  }
}
