import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router, ActivatedRoute } from "@angular/router";
import CourseService from '../services/course.service';
import InscriptionService from '../services/inscription.service';
import SubjectService from '../services/subject.service';
import AuthService from '../services/auth.service';

@Component({
  selector: 'question',
  inputs: ['courses'],
  template: `<section id="">
  <div class="container">
      <div class="row">
        <div class="col">
          <h1>Seleccione las materias que desea cursar</h1> 
          <ul class="list-group" *ngFor="let subject of subjects  | paginate: { itemsPerPage: 3, currentPage: p } ; let i = index" [attr.data-index]="i">
            <fieldset class="form-group row">
              <li class="list-group-item"> 
                <h2>{{subject.name}}</h2>
                <h5>{{getSubjectSchedule(i)}}</h5>
                <label class="custom-control custom-radio">
                  <input name= {{subject.name}} type="radio" class="custom-control-input" (click)="alreadyApproved(i)">
                  <span class="custom-control-indicator"></span>
                  <span class="custom-control-description">Ya la aprobé</span>
                </label>     
                <label class="custom-control custom-radio" *ngFor="let thiscourse of subject.courses">
                  <input name= {{subject.name}} type="radio" class="custom-control-input" (click)="selectCourse(thiscourse, i)">
                  <span class="custom-control-indicator"></span>
                  <span class="custom-control-description">Voy a cursar en {{thiscourse.name}}</span>
                </label>  
              </li>
            </fieldset>
          </ul>    
          <pagination-controls (pageChange)="p = $event" previousLabel="Anterior" nextLabel="Siguiente"></pagination-controls>            
        </div>
      </div>
      <div class="col-lg-2 col-centered">
        <button type="button" class="btn btn-primary btn-lg btn-block" (click)="send()">Finalizar</button>  
      </div>
    </div>
  </section>`,
  styleUrls: ['./assets/styles.css']
})
export default class QuestionComponent {
  subjects= []
  courses= []
  selectedCourses= []
  approvedCourses= []


  constructor(http, router, courseService, inscriptionService, subjectService, activatedRoute, authService) { 
    this.http = http;
    this.router = router;
    this.courseService = courseService
    this.inscriptionService = inscriptionService
    this.subjectService = subjectService
    this.activatedRoute= activatedRoute
    this.authService= authService
  }
 
  send() { 
    var inscription = {}
    var myCourses = []
    this.selectedCourses.forEach(function(element) {
      myCourses.push(element._id)
    })
    inscription.courses = myCourses
    this.inscriptionService.create(inscription, this.token)
  }

  selectCourse(thiscourse, i) {
    var subjectName = this.subjects[i].name
    this.selectedCourses = this.selectedCourses.filter(item => item.subject.name != subjectName)
    this.selectedCourses.push(thiscourse)
    this.approvedCourses = this.approvedCourses.filter(item => item != subjectName)
  }

  unselectCourse(i) {
    this.selectedCourses.splice(i, 1)
  }

  alreadyApproved(i) {
    var subjectName = this.subjects[i].name
    this.approvedCourses.push(subjectName)
    this.selectedCourses = this.selectedCourses.filter(item => item.subject.name != subjectName)
  }

  getCourseSchedule(indSub, indCour) {
    var course = this.subjects[indSub].courses[indCour]
    var schedule = "Comisión " + course.name + ". Horarios: "
    var i = 0
    for (; i < course.days.length; i++) { 
      if (i == course.days.length - 1) {
        schedule += course.days[i]
      } else {
          schedule += course.days[i] + ", " 
      }
    }
    schedule += " de " + course.startTime + " a " + course.endTime + " hs. "
    return schedule
  }

  getSubjectSchedule(index) {
    var subject = this.subjects[index]
    var schedules = ""
    var i = 0
    for (; i < subject.courses.length; i++) {
      schedules += this.getCourseSchedule(index, i) 
    }
    return schedules
  } 

  ngOnInit() {
  
    this.activatedRoute.params.subscribe(params => {
        this.token = params['token'];
    });
    this.authService.accessPermitted(this.token).subscribe(result => { },error => {
        this.router.navigate(['/login'])
      })
    this.courses = this.courseService.courses
    this.subjects = this.subjectService.subjects

    this.selectedCourses= []
    this.approvedCourses= []
  }

}

QuestionComponent.parameters = [
  Http, Router, CourseService, InscriptionService, SubjectService, ActivatedRoute, AuthService
]
