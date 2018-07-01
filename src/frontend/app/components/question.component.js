import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router, ActivatedRoute } from "@angular/router";
import InscriptionService from '../services/inscription.service';
import SubjectService from '../services/subject.service';
import AuthService from '../services/auth.service';

@Component({
  selector: 'question',
  inputs: ['courses'],
  template: `
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css">
      <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js">
  <section id="">
  <div class="container">
      <div class="row">
        <div class="col">
          <h1>Seleccione las materias que desea cursar</h1> 
          <ul class="list-group" *ngFor="let subject of subjects  | paginate: { itemsPerPage: 3, currentPage: p } ; let i = index" [attr.data-index]="i">
            <fieldset class="form-group row">
              <li class="list-group-item"> 
                <h2>{{subject.name}}</h2>
                <ul>    
                  <h5 *ngFor="let schedule of subject.schedule">
                    {{ schedule }}
                   </h5>
                </ul>
                <div class="btn-group">
                  <button type="button" class="chooseSubject btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{getValueForThisDropdown(subject._id)}}
                  </button>
                  <div class="dropdown-menu">
                    <button class="dropdown-item" (click)="unselect(subject)">Todavía no la voy a cursar</button>
                    <button class="chooseCourse dropdown-item" *ngFor="let thiscourse of subject.courses" (click)="selectCourse(thiscourse)">Cursaría en comisión {{thiscourse.name}}</button>
                  </div>
                </div>
              </li>
            </fieldset>
          </ul>    
          <pagination-controls (pageChange)="p = $event" previousLabel="Anterior" nextLabel="Siguiente"></pagination-controls>            
        </div>
      </div>
      <div class="col-lg-2 col-centered">
        <button type="button" class="submitQuestion btn btn-primary btn-lg btn-block" (click)="send()">Finalizar</button>  
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
  approvedSubjects= []
  valuesDropdowns= []
  alreadyAnswered= []
  editingInscription= false

  constructor(http, router,inscriptionService, subjectService, activatedRoute, authService) { 
    this.http = http;
    this.router = router;
    this.inscriptionService = inscriptionService
    this.subjectService = subjectService
    this.activatedRoute= activatedRoute
    this.authService= authService
  }
  
  unselect(subject) {
    this.removeAnySelectedCourseOfThisSubject(subject)
    this.removeFromApprovedSubjects(subject)
    this.changeValueForThisDropdown(subject._id, "Todavía no la voy a cursar")
  }

  removeAnySelectedCourseOfThisSubject(subject) {
    for (var i = 0; i < this.selectedCourses.length; i++) {
      if(this.selectedCourses[i].subject === subject._id)
        this.selectedCourses.splice(i, 1)
    }
  }

  removeFromApprovedSubjects(subject) {
    for (var i = 0; i < this.approvedSubjects.length; i++) {
      if(this.approvedSubjects[i]._id === subject._id)
        this.approvedSubjects.splice(i, 1)
    }
  }

  approved(subject) {
    this.unselect(subject)
    this.approvedSubjects.push(subject)
    this.changeValueForThisDropdown(subject._id, "Ya la aprobé")
  }

  selectCourse(course) {
    for (var i = 0; i < this.selectedCourses.length; i++) {
      if(this.selectedCourses[i].subject === course.subject)
        this.selectedCourses.splice(i, 1)
    }
    this.selectedCourses.push(course)
    this.changeValueForThisDropdown(course.subject, "Cursaría en comisión " + course.name)
  }

  send() { 
    var inscription = {}
    inscription.courses = this.selectedCourses

    if(this.editingInscription){
      for (var i in this.alreadyAnswered[0].courses) {
        this.inscriptionService.removeStudentFromCourse(this.alreadyAnswered[0].courses[i]).
        subscribe(result => { },error => { }) 
      }
      this.inscriptionService.edit(inscription, this.alreadyAnswered[0]._id)
    }
    else{
      this.inscriptionService.create(inscription, this.token)
    }
    for (var j in inscription.courses) {
      this.inscriptionService.addStudentToCourse(inscription.courses[j]).
      subscribe(result => { },error => { })
    }
    this.router.navigate(['thanks'])
  }

  getCourseSchedule(course) {
    var schedule = "Comisión " + course.name + ", Horarios: "
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

  getSubjectSchedule(subject) {
    subject.schedule = []
    var i = 0
    for (; i < subject.courses.length; i++) {
      subject.schedule.push(this.getCourseSchedule(subject.courses[i]))
    }
  } 

  initValueDropdowns() {
    if(this.alreadyAnswered.length>0){
      this.editingInscription = true
      this.initEditedDropdowns()
     // alert("Acepte para editar la encuesta previamente realizada")
    }else{
      this.initDefaultDropdowns()
    }
  }

  initEditedDropdowns() {
    for (var i in this.subjects) {
      this.completeDropdownBySubject(this.subjects[i])
    }
  }

  completeDropdownBySubject(aSubject){
    var wasSelected = false
    var i = 0
    for (; i < aSubject.courses.length; i++) {
      var cont = this.alreadyAnswered[0].courses.includes(aSubject.courses[i]._id)
      if(cont){
        if(aSubject.courses[i].name=='C1'){
          this.valuesDropdowns.push({idSubject: aSubject._id, value: "Cursaría en comisión C1"})
        }
        else{
          this.valuesDropdowns.push({idSubject: aSubject._id, value: "Cursaría en comisión C2"})
        }
        this.selectCourse(aSubject.courses[i])
        wasSelected = true
        break
      }
    }
    if(!wasSelected){
      this.valuesDropdowns.push({idSubject: aSubject._id, value: "Todavía no la voy a cursar"})
    }
  }

  initDefaultDropdowns() {
    for (var i = 0; i < this.subjects.length; i++) {
      this.valuesDropdowns.push({idSubject: this.subjects[i]._id, value: "Todavía no la voy a cursar"})
    }
  }

  getValueForThisDropdown(idSubject) {
    for (var i = 0; i < this.valuesDropdowns.length; i++) {
      if(this.valuesDropdowns[i].idSubject === idSubject)
        return this.valuesDropdowns[i].value
    }
  }

  changeValueForThisDropdown(idSubject, newValue) {
    for (var i = 0; i < this.valuesDropdowns.length; i++) {
      if(this.valuesDropdowns[i].idSubject === idSubject)
        this.valuesDropdowns[i].value= newValue
    }
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
        this.token = params['token'];
    })
    this.authService.accessPermitted(this.token).subscribe(result => { },error => {
        this.router.navigate(['/login'])
    })
    this.inscriptionService.inscriptionByToken(this.token).subscribe(result => { 
      this.alreadyAnswered = result.json()
    },error => {}) 
    
    this.selectedCourses= []
    this.subjectService.subjects().subscribe(result => { 
      this.subjects= result.json()
      this.courses = this.subjects.filter(subject => subject.courses)
      for (var i in this.subjects) {
        this.getSubjectSchedule(this.subjects[i])  
      }
      this.initValueDropdowns()
    },error => { })
    this.approvedCourses= []

  }

}

QuestionComponent.parameters = [
  Http, Router,  InscriptionService, SubjectService, ActivatedRoute, AuthService
]
