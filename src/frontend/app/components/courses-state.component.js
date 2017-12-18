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
      <div class="row">
        <div class="col-6" *ngFor="let subject of subjects ; let i = index" [attr.data-index]="i">
            <div id={{subject.name}}></div> 
        </div>
    </div>
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

  drawCourseState(subject, quota1, inscripted1, quota2, inscripted2){
    google.charts.load('current', {packages: ['corechart', 'bar']});
    google.charts.setOnLoadCallback(drawBarColors);

    function drawBarColors() {
      var data

      if(quota2 > 0){
        data = google.visualization.arrayToDataTable([
          ['Estado comisión', 'Cupo', 'Inscriptos'],
          ['Comisión 1', quota1, inscripted1],
          ['Comisión 2', quota2, inscripted2]
        ])
      }
      else{
        data = google.visualization.arrayToDataTable([
          ['Estado comisión', 'Cupo', 'Inscriptos'],
          ['Comisión 1', quota1, inscripted1],
        ])
      }

      var options = {
        title: subject,
        chartArea: {width: '50%'},
        colors: ['#b0120a', '#ffab91'],
      };
      var chart = new google.visualization.BarChart(document.getElementById(''+subject));
      chart.draw(data, options);
    }
  } 

  drawCourses(mysubjects){
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
             var inc1 = this.inscriptedInCourses[mysubjects[i].courses[j]._id]
             if(!(inc1 === undefined)){
               inscripted1 = inc1
             }
           }else{
               quota2 = mysubjects[i].courses[j].quota
               var inc2 = this.inscriptedInCourses[mysubjects[i].courses[j]._id]  
               if(!(inc2 === undefined)){
                 inscripted2 = inc2
               }
           }
         }
      }
      this.drawCourseState(''+subject, quota1, inscripted1, quota2, inscripted2)
      quota1 = 0
      inscripted1 = 0
      quota2 = 0
      inscripted2 = 0
    }
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

  ngOnInit() {  
    this.inscriptionService.getInscriptions().subscribe(result => { 
      this.inscriptions= result.json()
    },error => { }) 
    this.subjectService.subjects().subscribe(result => { 
      this.subjects= result.json()
      this.calculateInscripted(this.inscriptions)
      this.drawCourses(this.subjects)
    },error => { })
  }

}

CoursesStateComponent.parameters = [
  Http, Router, CourseService, InscriptionService, SubjectService
]