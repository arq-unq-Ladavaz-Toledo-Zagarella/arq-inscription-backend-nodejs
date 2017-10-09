import { Component } from '@angular/core';

import SubjectService from '../services/subject.service';

@Component({
  selector: 'app-view',
  template: `<!-- Navigation -->
			<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
			  <div class="container">
			    <a class="navbar-brand js-scroll-trigger" href="#page-top">Arquitectura</a>
			    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
			      <span class="navbar-toggler-icon"></span>
			    </button>
			    <div class="collapse navbar-collapse" id="navbarResponsive">
			      <ul class="navbar-nav ml-auto">        
			        <li class="nav-item">
			          <a class="nav-link js-scroll-trigger" href="" (click)="logout()">Salir</a>
			        </li>
			      </ul>
			    </div>
			  </div>
			</nav>
			<div class="container-fluid">
			    <router-outlet></router-outlet>
			</div>`,
  styleUrls: ['./assets/styles.css'],
  providers: [ SubjectService ]
})
export default class AppComponent {
  constructor() { }
}