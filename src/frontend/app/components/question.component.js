import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from "@angular/router";
import CourseService from '../services/course.service';
import InscriptionService from '../services/inscription.service';

@Component({
  selector: 'question',
  inputs: ['courses'],
  template: `<section id="">
  <div class="container">
      <div class="row">
        <div class="col">
          <h1>Seleccione las materias que desea cursar</h1> 
          <ul class="list-group" *ngFor="let course of courses; let i = index" [attr.data-index]="i">
            <fieldset class="form-group row">
              <li class="list-group-item"> 
                <h2>{{course.subject.name}}</h2>
                <h5>{{getSubjectSchedule(i)}}</h5>
                <label class="custom-control custom-radio">
                  <input name= {{course.subject.name}} type="radio" class="custom-control-input" (click)="alreadyApproved(i)">
                  <span class="custom-control-indicator"></span>
                  <span class="custom-control-description">Ya la aprobé</span>
                </label>     
                <label class="custom-control custom-radio" *ngFor="let thiscourse of course.subject.courses">
                  <input name= {{course.subject.name}} type="radio" class="custom-control-input" (click)="selectCourse(thiscourse)">
                  <span class="custom-control-indicator"></span>
                  <span class="custom-control-description">Voy a cursar en C{{thiscourse.name}}</span>
                </label>  
              </li>
            </fieldset>
          </ul>                
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
  courses= []
  coursesFound= []
  selectedCourses= []
  approvedCourses= []


  constructor(http, router, courseService, inscriptionService) { 
    this.http = http;
    this.router = router;
    this.courseService = courseService
    this.inscriptionService = inscriptionService
    //this.courses= this.courseService.courses
  }
 
  send() { 
    var random = Math.floor(Math.random() * 1000) + 1
    var inscription = {}
    inscription.courses = this.selectedCourses
    inscription.studentId = random
    //{ courses: this.selectedCourses , studentId: random} 
    console.log(inscription)
    this.inscriptionService.create(inscription)
  }

  deletePreviouslySelectedCourses() {
    return this.coursesFound.filter(item => this.selectedCourses.indexOf(item) < 0)
  }

  selectCourse(thiscourse) {
    this.selectedCourses = this.selectedCourses.filter(item => item.subject.name != thiscourse.subject.name)
    this.selectedCourses.push(thiscourse)
    this.approvedCourses = this.approvedCourses.filter(item => item != thiscourse.subject.name)
    console.log(this.selectedCourses)
    console.log(this.approvedCourses)
  }

  unselectCourse(i) {
    this.selectedCourses.splice(i, 1)
  }

  alreadyApproved(i) {
    var courseName = this.courses[i].subject.name
    this.approvedCourses.push(courseName)
    this.selectedCourses = this.selectedCourses.filter(item => item.subject.name != courseName)
    console.log(this.approvedCourses)
    console.log(this.selectedCourses)
  }

  setCoursesFound(anArray) {
    this.coursesFound= anArray
  }

  getCoursesFound() {
    return this.coursesFound
  }

  isThereAnyCourseFound() {
    return this.coursesFound != []
  }

  getCourseSchedule(indSub, indCour) {
    var course = this.courses[indSub].subject.courses[indCour]
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
    var course = this.courses[index]
    var schedules = ""
    var i = 0
    for (; i < course.subject.courses.length; i++) {
      schedules += this.getCourseSchedule(index, i) 
    }
    return schedules
  }

  ngOnInit() {
    if(sessionStorage.getItem("id") === null)
      this.router.navigate(['/login'])
    this.courses.push({subject: {name: "Mate 1", courses: [
      {"name":"1","quota":20, days: [ "Lunes", "Martes"], 
      startTime: "18", endTime: "22",subject:{name: "Mate 1", courses: [], career: []}}, 
      {"name":"2","quota":20, days: [ "Miércoles", "Jueves"],
      startTime: "08", endTime: "12",subject:{name: "Mate 1", courses: [], career: []}} ],
      career: []}})
    
    this.courses.push({subject: {name: "Mate 2", courses: [
      {"name":"1","quota":30,  days: [ "Lunes"],
      startTime: "15", endTime: "19",subject:{name: "Mate 2", courses: [], career: []}}],
      career: []}})
    
    this.courses.push({subject: {name: "Orga", courses: [
      {"name":"1","quota":25,  days: [ "Lunes", "Viernes"],
      startTime: "12", endTime: "15",subject:{name: "Orga", courses: [], career: []}}],
      career: []}})
    
    this.courses.push({subject: {name: "Objetos 3", courses: [
      {"name":"1","quota":15,  days: [ "Jueves"],
      startTime: "16", endTime: "22",subject:{name: "Objetos 3", courses: [], career: []}}],
      career: []}})
    this.selectedCourses= []
    this.approvedCourses= []
  }

  findCourses() {
    this.courses= this.courseService.Courses
    console.log(this.courses)
  }
}

QuestionComponent.parameters = [
  Http, Router, CourseService, InscriptionService
]
