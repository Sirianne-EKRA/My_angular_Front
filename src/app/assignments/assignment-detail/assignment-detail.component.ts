import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Assignment } from '../assignment.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatCheckboxModule, RouterLink],
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent {
  assignmentTransmis: Assignment | undefined;

  constructor(
    private assignmentsService: AssignmentsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id).subscribe(a => {
      this.assignmentTransmis = a;
    });
  }

  onAssignmentRendu() {
    if (!this.assignmentTransmis) return;

    this.assignmentTransmis.rendu = true;
    this.assignmentsService.updateAssignment(this.assignmentTransmis).subscribe(message => {
      console.log(message);
      this.router.navigate(['/home']);
    });
  }

  onDelete() {
    if (!this.assignmentTransmis) return;

    this.assignmentsService.deleteAssignment(this.assignmentTransmis).subscribe(message => {
      console.log(message);
      this.router.navigate(['/home']);
      this.assignmentTransmis = undefined;
    });
  }

  isAdmin() {
    return this.authService.loggedIn;
  }
}
