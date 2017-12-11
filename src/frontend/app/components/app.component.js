import { Component } from '@angular/core';
import { Router } from "@angular/router";
import InscriptionService from '../services/inscription.service';
import CourseService from '../services/course.service';
import SubjectService from '../services/subject.service';
import StudentService from '../services/student.service';
import AuthService from '../services/auth.service';

@Component({
  selector: 'app-view',
  template: `
			<div class="container-fluid">
			    <router-outlet></router-outlet>
			</div>`,
  styleUrls: ['./assets/styles.css'],
  providers: [ InscriptionService, CourseService, SubjectService, StudentService, AuthService ]
})
export default class AppComponent {
  
  constructor(router) { 
  	this.router= router
  }

  logout() {
  	sessionStorage.removeItem("id")
    this.router.navigate(['/'])
  }
}

AppComponent.parameters = [
  Router
]