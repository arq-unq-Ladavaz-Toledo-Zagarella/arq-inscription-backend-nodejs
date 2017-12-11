import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from "@angular/router";
import CourseService from '../services/course.service';
import InscriptionService from '../services/inscription.service';
import SubjectService from '../services/subject.service';

@Component({
  selector: 'courses-state',
  inputs: ['courses'],
  template: `<navbar></navbar>
  <section id="datos">
  <div class="container">
      <div class="row">
        <div class="col">
          <h3>Estado de comisiones</h3> 
          <ul class="list-group" *ngFor="let subject of subjects; let i = index" [attr.data-index]="i">
            <fieldset class="form-group row">
              <li class="list-group-item"> 
                <h4>{{subject.name}}</h4>   
                <div class="input-group" *ngFor="let thiscourse of subject.courses">
                  <h5>Comisión {{thiscourse.name}}.</h5>
                  <label>Cupo: {{thiscourse.quota}}.</label>
                  <label>Inscritos hasta el momento: {{calculateInscriptors(thiscourse._id)}}.</label>
                </div>  
              </li>
            </fieldset>
          </ul>                
        </div>
      </div>
    </div>
  </section>`,
  styleUrls: ['./assets/styles.css']
})
export default class CoursesStateComponent {
  subjects= []
  courses= []
  inscriptions= []

  constructor(http, router, courseService, inscriptionService, subjectService) { 
    this.http = http;
    this.router = router;
    this.courseService = courseService
    this.inscriptionService = inscriptionService
    this.subjectService = subjectService
  } 

  ngOnInit() {   
    this.courses = this.courseService.courses
    this.inscriptionService.getInscriptions().subscribe(result => { 
      this.inscriptions= result.json()
    },error => { })
    this.subjectService.subjects().subscribe(result => { 
      this.subjects= result.json()
    },error => { })
  }

  calculateInscriptors(courseId){
    var res = 0

    return courseId
  }

}

CoursesStateComponent.parameters = [
  Http, Router, CourseService, InscriptionService, SubjectService
]