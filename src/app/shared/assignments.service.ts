import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, catchError, forkJoin, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { bdInitialAssignments } from './data';
import { Matiere } from '../matieres/matiere.model'; // Importer le modèle de Matiere

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  constructor(private http: HttpClient) { }

  assignments: Assignment[] = [];
  backendUrl = 'https://my-angular-back-1.onrender.com/api/assignments';
  backendMatieresUrl = "https://my-angular-back-1.onrender.com/api/matieres";

  getAssignments(page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}?page=${page}&limit=${limit}`);
  }

  getAssignment(id: string): Observable<Assignment | undefined> {
    return this.http.get<Assignment>(`${this.backendUrl}/${id}`)
      .pipe(
        tap(a => console.log('Dans le TAP rxjs AVANT MAP ' + a.nom)),
        map(a => { a.nom += " MODIFIE PAR MAP"; return a; }),
        tap(a => console.log('Dans le TAP rxjs APRES MAP' + a.nom)),
        catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id))
      );
  }

  getMatiere(idMatiere: string): Observable<Matiere> {
    return this.http.get<Matiere>(`${this.backendMatieresUrl}/${idMatiere}`)
      .pipe(
        tap(m => console.log('Matiere reçue: ' + m.name)),
        catchError(this.handleError<Matiere>('### catchError: getMatiere by id=' + idMatiere))
      );
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(operation + ' a échoué ' + error.message);
      return of(result as T);
    };
  }

  addAssignment(assignment: Assignment): Observable<any> {
    return this.http.post<Assignment>(this.backendUrl, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    return this.http.put<Assignment>(this.backendUrl, assignment);
  }

  deleteAssignment(assignment: Assignment | undefined): Observable<any> {
    return this.http.delete<any>(`${this.backendUrl}/${assignment?._id}`);
  }

  peuplerBDNaive() {
    bdInitialAssignments.forEach(a => {
      let newAssignment = new Assignment();
      newAssignment.nom = a.nom;
      newAssignment.nom_eleve = a.nomEleve;
      newAssignment.matiere = a.matiere;
      newAssignment.dateDeRendu = new Date(a.dateDeRendu);
      newAssignment.rendu = a.rendu;
      newAssignment.note = a.note;
      newAssignment.remarque = a.remarque;

      this.addAssignment(newAssignment).subscribe(() => {
        console.log("Assignment ajouté : " + a.nom);
      });
    });
  }

  peuplerBDavecForkJoin(): Observable<any> {
    let appelsVersAddAssignment: Observable<any>[] = [];

    bdInitialAssignments.forEach(a => {
      const nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.nom_eleve = a.nomEleve;
      nouvelAssignment.matiere = a.matiere;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
      nouvelAssignment.note = a.note;
      nouvelAssignment.remarque = a.remarque;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment))
    });

    return forkJoin(appelsVersAddAssignment);
  }
}
