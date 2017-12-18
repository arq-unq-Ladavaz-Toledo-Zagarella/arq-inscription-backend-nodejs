import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from "@angular/router";

@Component({
  selector: 'navbar',
  template: `<!-- Navigation -->
      <nav class="navbar navbar-toggleable-md navbar-light bg-faded id=mainNav">
        <div class="container">
          <a class="navbar-brand" href="/#/inscription-state">Estado inscripción</a>
          <a class="navbar-brand" href="/#/courses-state" (click)="coursesState()">Estado comisiones</a>
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
      </nav>`
})

export default class NavbarComponent {

  constructor(http, router) { 
    this.http = http;
    this.router = router;
  }

  coursesState() {
    location.reload()
  }
}

NavbarComponent.parameters = [
   Http, Router 
]