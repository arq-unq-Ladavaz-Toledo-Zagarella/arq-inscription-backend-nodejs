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
    <h3>Estado de comisiones</h3> 
    <div id="table_div"></div>
  </div>

  </section>`,
  styleUrls: ['./assets/styles.css']
})
export default class CoursesStateComponent {
  subjects= []
  inscriptions= []
  inscriptedInCourses= []

  constructor(http, router, courseService, inscriptionService, subjectService) { 
    this.http = http;
    this.router = router;
    this.courseService = courseService
    this.inscriptionService = inscriptionService
    this.subjectService = subjectService
  } 

  calculateInscripted(inscriptions) {
      for (var i in inscriptions) {
        for (var j in inscriptions[i].courses){
          var unId = inscriptions[i].courses[j]
          if (this.inscriptedInCourses[unId] === undefined) { 
            this.inscriptedInCourses[unId] = 1         
          }
          else{
            var cant = this.inscriptedInCourses[unId] 
            this.inscriptedInCourses[unId] = cant + 1
          } 
        }
      }
  }

  drawCourseStateTable(mysubjects, myinscriptedInCourses) {
    google.charts.load('current', {'packages':['table']});
    google.charts.setOnLoadCallback(drawTable);

    function drawTable() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Nombre Materia');
      data.addColumn('number', 'Comisión');
      data.addColumn('number', 'Cupo');
      data.addColumn('number', 'Inscriptos');
      data.addColumn('number', 'Comisión');
      data.addColumn('number', 'Cupo');
      data.addColumn('number', 'Inscriptos');

      var quota1 = 0
      var inscripted1 = 0
      var quota2 = 0
      var inscripted2 = 0
      var subject = ''

      for (var i in mysubjects) {
        subject = mysubjects[i].name

        for (var j in mysubjects[i].courses){
          if (!(mysubjects[i].courses[j] === undefined)) {
            if(quota1 == 0){
              quota1 = mysubjects[i].courses[j].quota
              var inc1 = myinscriptedInCourses[mysubjects[i].courses[j]._id]
              if(!(inc1 === undefined)){
                inscripted1 = inc1
              }
            }else{
              quota2 = mysubjects[i].courses[j].quota
              var inc2 = myinscriptedInCourses[mysubjects[i].courses[j]._id]  
              if(!(inc2 === undefined)){
                inscripted2 = inc2
              }
            }
          }
        }
        
        if(quota2 == 0){
          data.addRows([
            [subject, 1, quota1, inscripted1, null, null, null],
          ]);
        }
        else{
          data.addRows([
            [subject, 1, quota1, inscripted1, 2, quota2, inscripted2],
          ]);
        }

        quota1 = 0
        inscripted1 = 0
        quota2 = 0
        inscripted2 = 0
      } 

      var table = new google.visualization.Table(document.getElementById('table_div'));

      table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
     }
  }

  ngOnInit() {  
    this.inscriptionService.getInscriptions().subscribe(result => { 
      this.inscriptions= result.json()
    },error => { }) 
    this.subjectService.subjects().subscribe(result => { 
      this.subjects= result.json()
      this.calculateInscripted(this.inscriptions)
      this.drawCourseStateTable(this.subjects, this.inscriptedInCourses)
    },error => { })
  }

}

CoursesStateComponent.parameters = [
  Http, Router, CourseService, InscriptionService, SubjectService
]