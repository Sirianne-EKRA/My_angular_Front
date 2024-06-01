import { Injectable } from '@angular/core';
import { Matiere } from '../matieres/matiere.model';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, of, tap } from 'rxjs';

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

    /**
   *
   * @param id => id de la matiere à récupérer
   * @returns une matiere ou undefined si la matiere n'est pas trouvée
   */
    getMatiere(id:string):Observable<Matiere|undefined> {
      // renvoie la matiere avec l'id passé en paramètre
      //const a:Assignment|undefined = this.assignments.find(a => a.id === id);

      //return of(a);
      return this.http.get<Matiere>(this.backendUrl + '/' + id)
      .pipe(
        tap(a => console.log('Dans le TAP rxjs AVANT MAP ' + a.name)),
        tap(a => console.log('Dans le TAP rxjs APRES MAP' + a.name)),
        catchError(this.handleError<any>('### catchError: getMatieres by id avec id=' + id))
      );
    }

    private handleError<T>(operation: any, result?: T) {
      return (error: any): Observable<T> => {
        // a partir du moment où on a une erreur, on peut la gérer ici
        // ici je fais des console.log mais on pourrait faire un
        // router.navigate vers une page d'erreur par exemple
        // ou afficher un message d'erreur à l'utilisateur

        console.log(error); // pour afficher dans la console
        console.log(operation + ' a échoué ' + error.message);

        return of(result as T);
      }
   };
}

