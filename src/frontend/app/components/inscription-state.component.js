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
    <div id="donutchart" style="width: 900px; height: 500px;"></div>
  </div>
  </section>`,
  styleUrls: ['./assets/styles.css']
})
export default class InscriptionStateComponent {

  totalStudents= 0
  answeredInscriptions= 0

  constructor(http, router, inscriptionService, studentService) { 
    this.http = http;
    this.router = router;
    this.inscriptionService = inscriptionService
    this.studentService = studentService
  }

  drawInscriptionState(total, answered){
      google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Realizaron encuesta', 'Cantidad alumnos'],
          ['Respondieron encuesta',     answered],
          ['Faltan responder',     total-answered]
        ]);

        var options = {
          title: 'Estado de la inscripción',
          pieHole: 0.4,
        };

        var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
        chart.draw(data, options);
      }
  }

  ngOnInit() {
    this.inscriptionService.inscriptionsTotal().subscribe(result => { 
      this.answeredInscriptions= result.json()
    },error => { })
    this.studentService.studentsTotal().subscribe(result => { 
      this.totalStudents= result.json()
      this.drawInscriptionState(this.totalStudents, this.answeredInscriptions)
    },error => { })
  }

}

InscriptionStateComponent.parameters = [
  Http, Router, InscriptionService, StudentService
]