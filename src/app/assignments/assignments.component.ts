import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenduDirective } from '../shared/rendu.directive';
import { NonRenduDirective } from '../shared/non-rendu.directive';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar'; // Importation de MatToolbarModule
import { RouterLink } from '@angular/router';
import { Assignment } from './assignment.model';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { AssignmentsService } from '../shared/assignments.service';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [
    CommonModule,
    RenduDirective,
    NonRenduDirective,
    MatListModule,
    MatButtonModule,
    RouterLink,
    MatInputModule,
    MatFormFieldModule,
    MatSliderModule,
    FormsModule,
    MatTableModule,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    MatPaginatorModule,
    MatCardModule,
    MatToolbarModule // Ajout de MatToolbarModule dans les imports
  ],
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  titre = "Liste des devoirs à faire :";
  displayedColumns: string[] = ['nom', 'dateDeRendu', 'rendu'];
  pageSizeOptions = [5, 10, 25, 50, 100];

  assignments: Assignment[] = [];
  totalDocs = 0;
  limit = 10;
  page = 1;
  totalPages = 0;
  pagingCounter = 0;
  hasPrevPage = false;
  hasNextPage = false;
  prevPage = 0;
  nextPage = 0;

  constructor(private assignmentsService: AssignmentsService) { }

  ngOnInit() {
    console.log("AVANT AFFICHAGE, on demande au service les données !");
    this.getAssignments();
  }

  getAssignments() {
    this.assignmentsService.getAssignments(this.page, this.limit)
      .subscribe(data => {
        this.assignments = data.docs;
        this.totalDocs = data.totalDocs;
        this.limit = data.limit;
        this.page = data.page;
        this.totalPages = data.totalPages;
        this.pagingCounter = data.pagingCounter;
        this.hasPrevPage = data.hasPrevPage;
        this.hasNextPage = data.hasNextPage;
        this.prevPage = data.prevPage;
        this.nextPage = data.nextPage;

        console.log("Dans le subscribe, données reçues !");
      });
    console.log("APRES APPEL DU SERVICE !");
  }

  getColor(a: any) {
    return a.rendu ? 'green' : 'red';
  }

  pageSuivante() {
    if (this.page < this.totalPages) {
      this.page++;
      this.getAssignments();
    }
  }

  pagePrecedente() {
    if (this.page > 1) {
      this.page--;
      this.getAssignments();
    }
  }

  premierePage() {
    this.page = 1;
    this.getAssignments();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }

  handlePageEvent(e: PageEvent) {
    this.limit = e.pageSize;
    this.page = e.pageIndex + 1;
    console.log("Dans handlePageEvent, page=" + this.page + " limit=" + this.limit);
    this.getAssignments();
  }
}
