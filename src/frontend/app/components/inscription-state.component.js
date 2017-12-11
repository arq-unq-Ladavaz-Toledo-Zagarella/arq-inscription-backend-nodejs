import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from "@angular/router";
import InscriptionService from '../services/inscription.service';
import StudentService from '../services/student.service';

@Component({
  selector: 'inscription-state',
  template: `<navbar></navbar>
  <section id="datos">
  <div class="container"> 
    <h1>Estado de la encuesta actual</h1>
    <br><br>
    <h3>Total alumnos: {{totalStudents}} </h3>
    <h3>Total alumnos que contestaron: {{answeredInscriptions}} </h3>
    <h3>Porcentaje respondieron: {{answered}} % </h3>
    <h3>Porcentaje no respondieron: {{noAnswered}} % </h3>
  </div>
  </section>`,
  styleUrls: ['./assets/styles.css']
})
export default class InscriptionStateComponent {

  totalStudents= 0
  answeredInscriptions= 0
  answered= 0
  noAnswered= 0

  constructor(http, router, inscriptionService, studentService) { 
    this.http = http;
    this.router = router;
    this.inscriptionService = inscriptionService
    this.studentService = studentService
  }

  ngOnInit() {
    this.inscriptionService.inscriptionsTotal().subscribe(result => { 
      this.answeredInscriptions= result.json()
    },error => { })
    this.studentService.studentsTotal().subscribe(result => { 
      this.totalStudents= result.json()
      this.answered= Math.floor(this.answeredInscriptions*100/this.totalStudents)
      this.noAnswered= 100-this.answered
    },error => { })
  }

}

InscriptionStateComponent.parameters = [
  Http, Router, InscriptionService, StudentService
]