import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from "@angular/router";
import InscriptionService from '../services/inscription.service';

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

  inscriptionProgress = []
  totalStudents= 0
  answeredInscriptions= 0

  constructor(http, router, inscriptionService, studentService) { 
    this.http = http;
    this.router = router;
    this.inscriptionService = inscriptionService
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

  loadResults(){
    this.totalStudents = this.inscriptionProgress.totalStudents
    this.answeredInscriptions = this.inscriptionProgress.totalInscriptions
  }

  ngOnInit() {
    this.inscriptionService.getInscriptionProgress().subscribe(result => { 
      this.inscriptionProgress = result.json()
      this.loadResults()
      this.drawInscriptionState(this.totalStudents, this.answeredInscriptions)
    },error => { })
  }

}

InscriptionStateComponent.parameters = [
  Http, Router, InscriptionService
]