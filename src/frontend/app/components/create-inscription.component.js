import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from "@angular/router";
import CourseService from '../services/course.service';
import InscriptionService from '../services/inscription.service';

@Component({
  selector: 'create-inscription',
  inputs: ['courses'],
  template: `<section id="">
  <div class="container">
    <div class="row">
      <div class="col">
        <h2>Buscar materias</h2>
        <input type="text" class="form-control" placeholder="Matemática, Bases de Datos, Organización de Computadoras..." aria-describedby="basic-addon2" [(ngModel)]="filter" (ngModelChange)="search()">
		    <div class="filterList" *ngIf="isThereAnyCourseFound()">
				<div class="list-group" *ngFor="let course of coursesFound; let i = index" [attr.data-index]="i">
				  <button type="button" class="btn-block list-group-item list-group-item-action subjects-found" (click)="selectCourse(i)">
				  <strong>{{course.subject.name}}</strong></button>
				</div>
			</div>
      </div>
      <div class="col">
        <h2>Materias seleccionadas</h2>                
        <ul class="list-group" *ngFor="let course of selectedCourses; let i = index" [attr.data-index]="i">
		  <li class="list-group-item">{{course.subject.name}}
		  	<button type="button" class="close" aria-label="Close" (click)="unselectCourse(i)">
				<span aria-hidden="true">&times;</span>
			</button>
		  </li>
		</ul>
      </div>
    </div>
  </div>
</section>
<hr>
<div class="col-lg-2 col-centered">
	<button type="button" class="btn btn-primary btn-lg btn-block" (click)="send()">Finalizar</button>	
</div>`,
  styleUrls: ['./assets/styles.css']
})
export default class CreateInscriptionComponent {
  filter= ""
  courses= []
  coursesFound= []
  selectedCourses= []

  constructor(http, router, courseService, inscriptionService) { 
    this.http = http;
    this.router = router;
    this.courseService = courseService
    this.inscriptionService = inscriptionService
    //this.courses= this.courseService.courses
  }
 
  send() {  
    //this.inscriptionService.create()
    this.router.navigate(['question'])
  }

  search() {
    if(!this.filterEntered()){
      this.setCoursesFound([])
    }else {
      this.setCoursesFound(this.applyFilter())
      this.setCoursesFound(this.deletePreviouslySelectedCourses())
    }
  }

  applyFilter() {
    return this.courses.filter( course => course.subject.name.toLowerCase( ).indexOf(this.filter.toLowerCase( )) >= 0)
  }

  deletePreviouslySelectedCourses() {
    return this.coursesFound.filter(item => this.selectedCourses.indexOf(item) < 0)
  }

  selectCourse(i) {
    this.selectedCourses.push(this.coursesFound[i])
    this.setCoursesFound([])
    this.deleteFilter()
  }

  unselectCourse(i) {
    this.selectedCourses.splice(i, 1)
  }

  filterEntered() {
    return this.filter != ""
  }

  deleteFilter() {
    this.filter= ""
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


  ngOnInit() {
    if(sessionStorage.getItem("id") === null)
      this.router.navigate(['/login'])
    this.courses.push({subject: {name: "Mate 1"}})
    this.courses.push({subject: {name: "Mate 2"}})
    this.courses.push({subject: {name: "Orga"}})
    this.courses.push({subject: {name: "Objetos 3"}})
  }

  findCourses() {
    this.courses= this.courseService.Courses
    console.log(this.courses)
  }
}

CreateInscriptionComponent.parameters = [
  Http, Router, CourseService, InscriptionService
]