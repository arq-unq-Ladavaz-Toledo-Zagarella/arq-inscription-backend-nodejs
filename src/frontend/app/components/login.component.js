import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from "@angular/router";
import 'rxjs/add/operator/map'

@Component({
  selector: 'login',
  template: `<section id="datos">
  <div class="container">
    <div class="row">
      <div class="col-sm-7">
        <div class="container">
          <a href="http://www.unq.edu.ar/">
            <img src="http://www.unq.edu.ar/images/logo_unqui.png">
          </a>
          <br><br>
          <h1>PreInscripcion</h1>
          <p>La encuesta es obligatoria, pero no vinculante. Es decir, todos tienen que completarla, pero podrían cambiar la opción en el momento de la inscripción. Les pido que completen la encuesta a conciencia. </p>
        </div>
      </div>
      <div class="col-sm-4">              
        <div class="form-group">
           <label for="usr">Usuario</label>
            <input type="text" class="form-control" id="inputUsername" [(ngModel)]="username" readonly>
          <label for="pwd">Contraseña</label>
          <input type="password" class="form-control" id="inputPassword" [(ngModel)]="password" readonly>
        </div>          
        <div class="text-center">
          <button type="button" class="btn btn-primary btn-lg btn-block" (click)="login()">Comenzar</button>
        </div>
      </div>
    </div>
  </div>
</section>`,
  styleUrls: ['./assets/styles.css']
})
export default class LoginComponent {
  username = "usuariodeprueba"
  password = "usuariodeprueba"

  constructor(http, router) { 
    this.http = http;
    this.router = router;
  }

  login() {
  	sessionStorage.setItem("id", 1)
    this.router.navigate(['question'])
  }
}

LoginComponent.parameters = [
  Http, Router
]