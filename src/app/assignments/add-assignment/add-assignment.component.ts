import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common'; // Importer CommonModule
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { MatieresService } from '../../shared/matieres.service';
import { Router } from '@angular/router';
import { Matiere } from '../../matieres/matiere.model';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatButtonModule, MatSelectModule, CommonModule], // Ajouter CommonModule
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  constructor(private assignmentsService: AssignmentsService,
              private matieresService: MatieresService,
              private router: Router) { }

  nomDevoir = '';
  nomEleve = '';
  matiere = '';
  dateDeRendu: Date | null = null;
  note: number | null = null;
  remarque = '';

  subjects: Matiere[] = [];

  ngOnInit() {
    this.matieresService.getMatieres().subscribe(data => {
      console.log(data); // Debugging
      this.subjects = data;
      console.log(this.subjects); // Debugging
    });
  }

  onSubmit() {
    if (this.nomDevoir === '' || this.nomEleve === '' || this.matiere === '' || this.dateDeRendu === null || this.note === null || this.remarque === '') return;

    let a = new Assignment();
    a.nom = this.nomDevoir;
    a.nom_eleve = this.nomEleve;
    a.matiere = this.matiere;
    a.dateDeRendu = this.dateDeRendu;
    a.note = this.note;
    a.remarque = this.remarque;
    a.rendu = false;

    this.assignmentsService.addAssignment(a).subscribe(message => {
      console.log(message);
      this.router.navigate(['/home']);
    });
  }
}
