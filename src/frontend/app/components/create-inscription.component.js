import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from "@angular/router";
import SubjectService from '../services/subject.service';

@Component({
  selector: 'create-inscription',
  inputs: ['subjects'],
  template: `<section id="">
  <div class="container">
    <div class="row">
      <div class="col">
        <h2>Buscar materias</h2>
        <input type="text" class="form-control" placeholder="Matemática, Bases de Datos, Organización de Computadoras..." aria-describedby="basic-addon2" [(ngModel)]="filter" (ngModelChange)="search()">
		    <div class="filterList" *ngIf="isThereAnySubjectFound()">
				<div class="list-group" *ngFor="let subject of subjectsFound; let i = index" [attr.data-index]="i">
				  <button type="button" class="btn-block list-group-item list-group-item-action subjects-found" (click)="selectSubject(i)">
				  <strong>{{subject.name}}</strong></button>
				</div>
			</div>
      </div>
      <div class="col">
        <h2>Materias seleccionadas</h2>                
        <ul class="list-group" *ngFor="let subject of selectedSubjects; let i = index" [attr.data-index]="i">
		  <li class="list-group-item">{{subject.name}}
		  	<button type="button" class="close" aria-label="Close" (click)="unselectSubject(i)">
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
  subjects= []
  subjectsFound= []
  selectedSubjects= []

  constructor(http, router, subjectService) { 
    this.http = http;
    this.router = router;
    this.subjectService = subjectService
    this.subjects= this.subjectService.subjects
  }
 /*
  send() {
    this.http.post('/inscriptions/create/1', this.selectedSubjects).map(res => res.json())
    .subscribe(
      result => {
        this.router.navigate(['/my-inscription', result.id])
      },
      error => { });
  }
*/
  search() {
    if(!this.filterEntered()){
      this.setSubjectsFound([])
    }else {
      this.setSubjectsFound(this.applyFilter())
      this.setSubjectsFound(this.deletePreviouslySelectedSubjects())
    }
  }

  applyFilter() {
    return this.subjects.filter( subject => subject.name.toLowerCase( ).indexOf(this.filter.toLowerCase( )) >= 0)
  }

  deletePreviouslySelectedSubjects() {
    return this.subjectsFound.filter(item => this.selectedSubjects.indexOf(item) < 0)
  }

  selectSubject(i) {
    this.selectedSubjects.push(this.subjectsFound[i])
    this.setSubjectsFound([])
    this.deleteFilter()
  }

  unselectSubject(i) {
    this.selectedSubjects.splice(i, 1)
  }

  filterEntered() {
    return this.filter != ""
  }

  deleteFilter() {
    this.filter= ""
  }

  setSubjectsFound(anArray) {
    this.subjectsFound= anArray
  }

  getSubjectsFound() {
    return this.subjectsFound
  }

  isThereAnySubjectFound() {
    return this.subjectsFound != []
  }

/*
  ngOnInit() {
    if(sessionStorage.getItem("id") === null)
      this.router.navigate(['/'])
  }
*/
  findSubjects() {
    this.subjects= this.subjectService.subjects
    console.log(this.subjects)
  }
}

CreateInscriptionComponent.parameters = [
  Http, Router, SubjectService
]